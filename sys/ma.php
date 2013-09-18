<?php

class sendForm{
	public $html;
	public $className= 'form';
	public $widgets= array(); // id => array(type, options);
	public $log;
}

$formRequested= $_SERVER['QUERY_STRING'];

$form= new sendForm();
$form->className= 'ma-wdForm';


switch ($formRequested){
	case 'sys/start':
		$form->widgets['continue']= array('className'=>'ma-wdButton'
			, 'options'=>array('action'=>array('action'=>'openForm','form'=>'sys/continue', 'formActions'=>array('action'=>'compound', 'actions'=>array(
					1 => array('action'=>'setFilter','filter'=>'peo*0')
					, 2 => array('action'=>'setAutomation', 'automation'=>'activeForm')
					, 3 => array('action'=>'setDashboard'))
					))
				));
		
		$form->html= '<h1>Formulario de inicio</h1>';
		$form->html.= "<p>Este es el formulario inicial de arranque.</p>";
		$form->html.= "<p>Normalmente será un login con contraseña.</p>";
		$form->html.= '<button id="continue">Continuar</button><br/>';
		break;
	
	case 'sys/continue':
		$form->widgets['ok']= array('className'=>'ui-button');
		
		$form->html= '<h1>Formulario de continuación</h1>';
		$form->html.= "<p>Este representa a un formulario normal dentro de la aplicación.</p>";
		$form->html.= '<button id="ok">Aceptar</button><br/>';
		
		$form->log= 'POST: ' . print_r($_POST, true);
		$form->log.= 'GET: ' . print_r($_GET, true);
		$form->log.= 'SERVER: ' . print_r($_SERVER, true);
		
		
		break;
	
	case 'sys/test':
		$form->widgets['continue']= array('className'=>'ui-button');
		$form->widgets['pause']= array('className'=>'ui-button');
		$form->widgets['restore']= array('className'=>'ui-button','options'=>array('disabled'=>true));
		$form->widgets['mabutton']= array('className'=>'ma-wdButton');
		$form->widgets['login']= array('className'=>'ma-wdTextBox');
		$form->widgets['login1']= array('className'=>'ma-wdTextBox');
		$form->widgets['login2']= array('className'=>'ma-wdTextBox');
		
		$form->html= '<h1>Formulario 1</h1>';
		$form->html.= '<p>Este es un formulario descargado de internet</p>';
		$form->html.= '<button id="continue">Continue</button><br/>';
		$form->html.= '<button id="pause">Pause</button><br/>';
		$form->html.= '<button id="restore">Restore database</button><br/>';
		$form->html.= '<button id="mabutton">Custom Button</button><br/>';
		$form->html.= '<input id="login" /><br/>';
		$form->html.= '<input id="login1" /><br/>';
		$form->html.= '<input id="login2" /><br/>';
	break;
	
	default:
		$form->widgets['ok']= array('className'=>'ui-button');
		
		$form->html= '<h1>Formulario no encontrado</h1>';
		$form->html.= "<p>El formulario: $formRequested no existe.</p>";
		$form->html.= '<button id="ok">Aceptar</button><br/>';
		
}





echo json_encode($form);