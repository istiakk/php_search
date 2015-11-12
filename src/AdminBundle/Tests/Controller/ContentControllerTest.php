<?php

namespace AdminBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ContentControllerTest extends WebTestCase
{
    public function testContent()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/content');
    }

}
