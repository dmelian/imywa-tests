<?php

class escpos_printer{

	private $buffer;
	private $error;

    public function loadPortableBitMap($filename, $density='double', $dots=24){
    	# density - enum('single', 'double');
    	# dots - 8 | 24;
 
    	$pbmf= fopen($filename, 'r');
    	$magicNumber= chop(fgets($pbmf));
    	if ($magicNumber != "P4") {
    		$this->error= "invalid PBM format.";
    		fclose($pbmf);
    		return false;
    	}
    	
    	$dimensions= chop(fgets($pbmf));
    	if (substr($dimensions,0,1) == '#') $dimensions= chop(fgets($pbmf)); //Ignore comments begining with #
    	list($width,$height) = explode(' ',$dimensions); 
    	
    	$this->buffer= '';
    	for ($lineCount= 0; $lineCount < $height / $dots; $lineCount++){
			$lineChars= '';
			    	
    		if (isset($lineBuff)) unset($lineBuff);
    		for ($y= 0; $y < $dots; $y++) $lineBuff[$y]= str_pad(fread($pbmf, $width>>3), $width>>3,"\x00");
    		
    		for ($x= 0; $x < $width; $x++){
    			$dotMatrix= str_pad('',$dots,'0'); // php and integers are on war
    			for ($y= 0; $y < $dots; $y++){
    				if (ord(chr(128>>($x % 8)) & $lineBuff[$y][floor($x/8)])) $dotMatrix[$y]= '1'; 
    			}
    			
				for ($ichr=0; $ichr<$dots/8; $ichr++){
					$chr= 0;
					for ($i=0,$bit=128; $i<8; $i++,$bit>>=1) $chr+= $dotMatrix[$ichr*8+$i] == '1' ? $bit : 0;
					$lineChars.= chr($chr); 
				}
    		}
    		$argm= $dots == 8 ? ($density == 'single' ? "\x00" : "\x01") : ($density == 'single' ? "\x20" : "\x21");
    		$this->buffer.= "\x1b*$argm". chr($width % 256) . chr(floor($width / 256)) . "$lineChars\n"; // ESC * command
			
    	}
		
    	fclose($pbmf);
		return true;
    }


	public function portableBitMap_to_escPos( $portableBitMap, $escPosRawFilename ){

		// Add to the raw file the bimap, do not trunck the file.
		if ( $this->loadPortableBitMap($portableBitMap, 'double', 24) ) {
			$eprf= fopen($escPosRawFilename, 'a+');
			$eprf->write("\x1b\x33\x00"); // ESC 3 0 for no line spacing
			$eprf->write($this->buffer);
			$eprf->write("\x1b\x32"); //ESC 2 to restore the previous line spacing
			$eprf->close();
		}

	}


}
?>
