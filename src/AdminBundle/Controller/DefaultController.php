<?php
//=== Istiak PHP_Search ===
//Contributors: Istiak Mah
//Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=T2J4GWJE5SKQE
namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('AdminBundle:Default:index.html.twig', array('name' => $name));
    }
}
