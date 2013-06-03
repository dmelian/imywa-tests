<?php
class packArray{
	const PACKHEADLENGTH= 12;

	public function pack($array, $serialize=true, $keys=false){
		$values= ''; $lengths= array();
		foreach($keys ? array_keys($array) : $array as $value) {
			$svalue= $serialize ? serialize($value) : $value;
			$values.= $svalue;
			$lengths[]= strlen($svalue);
		}
		$result= implode(';',$lengths).":".$values; 
		return str_pad(strlen($result),self::PACKHEADLENGTH,'0',STR_PAD_LEFT).">".$result;
	}
	
}

$array= array("Un String",true,false,23453,2344.25,2.353,2.6e-45,null);
echo "Array:\n";
print_r($array);
echo "Packed Array:\n";
echo packArray::pack($array);
