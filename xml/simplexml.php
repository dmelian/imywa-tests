<html>
<body>
<form>
<?php
$path = isset($_GET['path']) ? $_GET['path'] : '' ; 
$e = new SimpleXMLElement(file_get_contents("petardo.xml"));
echo "Name: ". $e->getName() .".<br>";
echo "Attributes.<br>";
$i = 0;
foreach($e->attributes() as $name => $value) {
	echo "Attribute $i: $name = $value.<br>";
	$i++;
}
echo "Namespaces .<br>";
$i = 0;
foreach($e->getNamespaces(true) as $namespace) {
	echo "Namespace $i: $namespace.<br>";
	$i++;
}
echo "Children ".$e->count().".<br>";
$i = 0;
foreach($e->Children('est', true) as $child) {
	echo "Children $i: ".$child->getName().".<br>";
	$i++;
}

?>
</form>
</body>
</html>
