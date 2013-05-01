<?php
$texto = "texto inicial LINK[5t:Este es el caballo que viene de Bonanza]\n";
$texto .= " texto intermedio LINK[5ts:Este es el caballo que viene de Bonanza también]\n";
$texto .= " texto intermedio LINK[5tda:Este es el caballo que viene de Bonanza pero se quedo]\n";
$texto .= " texto intermedio LINK[s5t:Este es el caballo que viene de Bonanza oiga]\n";
$texto .= " texto intermedio LINK[asda5t:Este es el caballo que viene de Bonanza y de mas allá]\n";
$texto .= " un par de links indefinidos LINK[23] LINK[21] LINK[76].\n";
$texto .= " texto intermedio LINK[sda5t:Este es el caballo que viene de Bonanza Maña]\n";
$texto .= " texto intermedio LINK[d235t:Este es el caballo que viene de Bonanza. Venía.] texto final\n";
$texto .= " Dos links seguidosLINK[1:PEO]LINK[2:PIS]FIN";
echo "Texto: $texto\n\n\n";
$matches = array();
$i=0;
$offset = 0;
while (($i<100) && (preg_match('%LINK\[([^\]:]+)\]%',$texto,$matches,PREG_OFFSET_CAPTURE,$offset)>0)) {
	$i++;
	$link = "<a href=\"{$matches[1][0]}\">UNDEFINED TEXT<a>";
	$texto = substr($texto, 0, $matches[0][1]) . $link . substr($texto, $matches[0][1] + strlen($matches[0][0]));
	$offset = $matches[0][1] + strlen($link); 
	echo "MATCH $i\nTexto: $texto\n\n"; 
}
$offset = 0;
while (($i<100) && (preg_match('%LINK\[([^:]+):([^\]]+)\]%',$texto,$matches,PREG_OFFSET_CAPTURE,$offset)>0)) {
	$i++;
	$link = "<a href=\"{$matches[1][0]}\">{$matches[2][0]}<a>";
	$texto = substr($texto, 0, $matches[0][1]) . $link . substr($texto, $matches[0][1] + strlen($matches[0][0]));
	$offset = $matches[0][1] + strlen($link); 
	echo "MATCH $i\nTexto: $texto\n\n"; 
}

?>