<?php
class cls_codetemplate{
	private $ncharcursor;
	private $template;
	private $values;
	private $commander;
	private $lasttoken;

	public function __construct($template, $values, $commander){
		# template - string with code to stamp.
		# values - asoc array of identier => value.
		# commander - object to execute the commands in the template.

		$this->template =& $template;
		$this->values =& $values;
		$this->commander =& $commander;

	}
	
	public function stamp(){
		# template - string with code to stamp.
		# values - asoc array of identier => value.
		# commander - object to execute the commands in the template.

		$stamp = '';
		$pcharcursor = 0;
		
		while (($ncmdcursor = strpos($this->template, '<!', $pcharcursor)) !== false){
			$stamp .= $this->substvalues(substr($this->template, $pcharcursor, $ncmdcursor - $pcharcursor), $this->values);
			$this->ncharcursor = $ncmdcursor+2;
			$pcharcursor = $this->ncharcursor;
			
			$stamp .= $this->parsecommand();
			$pcharcursor = $this->ncharcursor;
		}
		$stamp .= $this->substvalues(substr($this->template, $pcharcursor), $this->values);
		
		return $stamp;
	}
	
	private function substvalues($string, $values){
		extract($values, EXTR_PREFIX_ALL,'');
		eval ('$code = "'. $string . '";');
		return $code;
		
	}
	
	private function parsecommand(){
		$myncharcursor = strpos($this->template, '>', $this->ncharcursor) + 1;
		print("parsing command :". substr($this->template, $this->ncharcursor, $myncharcursor - $this->ncharcursor). "<br>");
		do {
			$this->lex();
			print_r($this->lasttoken); print('<br>');
		} while ($this->lasttoken['token'] != '$');
		return '';
	}
	
	private function lex(){

		$len = strlen($this->template);
		while ($this->ncharcursor < $len && strpos(" \t\n", $this->template[$this->ncharcursor]) !== false) $this->ncharcursor++;
		if ($this->ncharcursor >= $len){
			$this->lasttoken = array('token'=>'$');
		
		} else {
			switch($this->template[$this->ncharcursor]){
				case '>': $this->ncharcursor++; $this->lasttoken = array('token'=>'$');  break;
				case '=': 
					$this->ncharcursor++;  
					$this->lasttoken = array('token'=>'=');  
					break;

				case "'": case '"':
					$i = $this->ncharcursor;
					$comilla = $this->template[$i++];
					$inicio = $i; $result = '';
					do {
						while ($i<$len && $this->template[$i] != $comilla) $i++;
						$seguir = $i+1 < $len && $this->template[$i+1] == $comilla;
						if ($seguir) $i=$i+2;	 
					} while ($seguir); 
					$result .= substr($this->template,$inicio,$i-$inicio);
					if ($i==$this->ncharcursor) $this->ncharcursor++; else $this->ncharcursor = $i+1;
					$this->lasttoken = array('token'=>'string', 'value'=>$result);
					break;
					
				default: 
					$i = $this->ncharcursor;
					while ($i<$len && (strpos(">= \t\n",$this->template[$i])===false)) $i++;
					$result = substr($this->template,$this->ncharcursor,$i-$this->ncharcursor);
					if ($i==$this->ncharcursor) $this->ncharcursor++; else $this->ncharcursor = $i;
					$this->lasttoken = array('token'=>'property', 'value'=>$result);
					break;
			}
		}
	}
}

$ct = new cls_codetemplate('$_ble bla bla bla<br>'
	.'ble $_ble ble<br>'
	.'bli bli $_ble bli<br>'
	.'blo <! este es="el" caballo ="que" viene= "de" Bonanza = "mierdinga"> blo blo<br>'
	.'norrrorllll.<br>'
	, array('ble'=>'peo torpedo')
	, 1);



echo 'Stamped:' . $ct->stamp();






?>

