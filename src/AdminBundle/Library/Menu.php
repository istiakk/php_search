<?php

namespace AdminBundle\Library;

class Menu
{
    protected $classes;
    
    public function __construct($menuItem = false)
    {
        if ($menuItem) {
            $this->classes[$menuItem] = "current";
        }
    }        
        
    public function getClass($menuItem) {
        if (isset($this->classes[$menuItem])) {
            return $this->classes[$menuItem];
        }
        return '';
    }

    public function setClass($menuItem) {
        $this->classes[$menuItem] = "current";
    }
    
}
