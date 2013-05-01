<?php

class mybaseclass {
	
	
	public function echomyname() {
		echo "mybaseclass\n---------------\n";
		echo "get_class: ". get_class(). "\n";
		echo "get_class (THIS): " . get_class($this). "\n";
		echo "get_called_class: " . get_called_class(). "\n";
	}
	
}

class myderivedclass extends mybaseclass{
	
	public function echomyname() {
		echo "myderivedclass\n---------------\n";
		echo "get_class: ". get_class(). "\n";
		echo "get_class (THIS): " . get_class($this). "\n";
		echo "get_called_class: " . get_called_class(). "\n";
		parent::echomyname();
	}
	
}

class myderived2class extends myderivedclass{
	
	public function echomyname() {
		echo "myderived2class\n---------------\n";
		echo "get_class: ". get_class(). "\n";
		echo "get_class (THIS): " . get_class($this). "\n";
		echo "get_called_class: " . get_called_class(). "\n";
		parent::echomyname();
	}
	
}

$a = new mybaseclass();
$b = new myderivedclass();
$c = new myderived2class();


echo "\nbase: \n" . $a->echomyname();
echo "\nderived: \n" . $b->echomyname();
echo "\nderived2: \n" . $c->echomyname();

?>