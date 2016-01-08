<?php
//=== Istiak PHP_Search ===
//Contributors: Istiak Mah
//Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=T2J4GWJE5SKQE
namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AdminBundle\Library\Menu;

class ContentController extends Controller {

    protected $menu;

    public function __construct() {
        $this->menu = new Menu('home');
    }

    /**
     * @param Request $request
     * @return Response
     */
    function contentAction(Request $request) {

        $tic = microtime(true);
        $request = $this->getRequest();

        $products = array();

        $feed = '/Users/istiak/Documents/OneDrive/GIT/PHP_Search/src/AdminBundle/Resources/products.json';

        $file = file_get_contents($feed);

        // check whethere it is an JSON file
        if (json_decode($file) != null) {

            $json = json_decode($file, true);

            $all_data = array();
            foreach ($json as $obj) {

                $doc = array();
                $doc['id'] = $obj['produkt_id'];
                $doc['name'] = $obj['produkt_namn'];
                $doc['category'] = $obj['kategori_namn'];

                // array push all documents into $all_data
                $all_data [] = $doc;
            }

            // combine all the products into a single array to make in to usable
            $all_products = array_column($all_data, 'name');
            $all_products = array_map('strtolower', $all_products);

            $groupBy = array();
            $labels = array();

            // Group all documents based on the category
            foreach ($all_data as $data) {
                array_push($labels, $data['category']);
                $id = $data['category'];
                if (isset($groupBy[$id])) {
                    $groupBy[$id][] = $data;
                } else {
                    $groupBy[$id] = array($data);
                }
            }

            // convert all the data into small letter so can be findable
            array_walk_recursive($groupBy, function (&$item) {
                $item = strtolower($item);
            });
            $groupBy = array_change_key_case($groupBy, CASE_LOWER);

            // all unique catagory's which can be shown on the page as well
            // if a user choose one category, the user will get the the products which belongs to that category
            $categoryUnq = array_unique($labels);
            $categoryUnq = array_map('strtolower', $categoryUnq);

            if ($request->getMethod() == 'POST') {

                $content = $request->request->get('contentSearch');

                // Step : 1 --> make all the request small latter since PHP is case sensative
                $contentSearch = (utf8_encode(strtolower($content)));
                // for some special words like ä å ö ...
                $contentSearch = htmlentities($contentSearch);

                // Step : 2 --> handle the negetive word, if there is any negetive number in the request process
                if (preg_match('/\-[\d]+/', $contentSearch)) {

                    // Step : 3 --> handle the negetive word and reduce a value from input, like -2 become 1    
                    $contentSearch = preg_replace_callback('/-\d+/', function($matches) {
                        return abs($matches[0]) - 1;
                    }, $contentSearch);
                } else {
                    // we do not need anything in the else part because if there is no negetive number it will take the default request
                }

                // Step : 4 --> If the request data is a Category return all belongins data
                if (in_array($contentSearch, $categoryUnq)) {
                    if (array_filter($categoryUnq, function($b) use ($contentSearch) {
                                return stripos($b, $contentSearch) !== false;
                            })) {
                        $elements = $groupBy[($contentSearch)];

                        foreach ($elements as $ele) {
                            $val['name'] = $ele['name'];
                            $products [] = $val;
                        }
                    }
                } else {
                    // Step : 5 --> If the request does not belongs to any Category 
                    // it will try to search from all the documents
                    $search = $this->my_array_search($all_products, $contentSearch);

                    $products = array();
                    if (!empty($search)) {
                        foreach ($search as $val) {
                            $products[]['name'] = $val;
                        }
                    } elseif (empty($search)) {

                        // Step : 6 --> If the request does not match any documents there is a probability
                        // that the user is request it in a reverser way, so we also reverse the request to make it even

                        $temp = explode(" ", $contentSearch);
                        $contentR = array();
                        for ($i = count($temp) - 1; $i >= 0; $i--) {
                            $contentR [] = $temp[$i] . " ";
                        }
                        // reverse request value
                        $contentStr = implode(" ", $contentR);

                        $searchAgain = $this->my_array_search($all_products, $contentStr);

                        if (!empty($searchAgain)) {
                            foreach ($searchAgain as $val) {
                                $products[]['name'] = $val;
                            }
                        }
                        // Step : 7 --> If Nothing have been found than the return message
                        else {
                            
                        }
                    }
                }
            }
        }

        // check whethere it is an xml file
        else if (!empty($xml = simplexml_load_file($feed, 'SimpleXMLElement', LIBXML_NOCDATA))) {
            echo 'XML';
        }
        
        
        // if it is neither of a JSON or a XML further action need to be take
        // advice will be to send an email
        else {
            echo 'nethir XML or JSON';
        }

        $time = (" !!! Took: " . round((microtime(true) - $tic)) . "s");

        // Content view page
        return $this->render('AdminBundle:Content:content.html.twig', array(
                    'pageTitle' => 'Istiak Contents',
                    'menu' => $this->menu,
                    'categoryUnq' => $categoryUnq,
                    'products' => $products,
                        )
        );
    }
   
    
    
    
    
    function my_array_search($array, $string) {      
        $pattern = preg_replace('/\s+/', ' ', preg_quote($string));
        return array_filter($array, function ($value) use($pattern) {
            return preg_match('/' . $pattern . '/', $value) == 1;
        });
    }

}
