<?php

class mybaseclass {
	public $className, $baseClassName;

	public function __construct(){
		$class='mybaseclass';
		$className= get_class($this);
		$baseClassName= get_class(); 
		$this->className= $className;
		$this->baseClassName= $baseClassName; 
		echo "$class.classname=$className\n";
		echo "$class.baseclassname=$baseClassName\n";
		echo "\n";
	}
}

class myderivedclass extends mybaseclass{

	public function __construct(){
		parent::__construct();
		$class='myderivedclass';
		$className= get_class($this);
		$baseClassName= get_class(); 
		$this->className= $className;
		$this->baseClassName= $baseClassName; 
		echo "$class.classname=$className\n";
		echo "$class.baseclassname=$baseClassName\n";
		echo "\n";
	}
}

class mydoblederivedclass extends myderivedclass{

	public function __construct(){
		parent::__construct();
		$class='mydoblederivedclass';
		$className= get_class($this);
		$baseClassName= get_class(); 
		$this->className= $className;
		$this->baseClassName= $baseClassName; 
		echo "$class.classname=$className\n";
		echo "$class.baseclassname=$baseClassName\n";
		echo "\n";
	}
}

class mytriplederivedclass extends mydoblederivedclass{

	public function __construct(){
		parent::__construct();
		$class='mytriplederivedclass';
		$className= get_class($this);
		$baseClassName= get_class(); 
		$this->className= $className;
		$this->baseClassName= $baseClassName; 
		echo "$class.classname=$className\n";
		echo "$class.baseclassname=$baseClassName\n";
		echo "\n";
	}
}

$b = new mytriplederivedclass();
print_r($b);

?>
