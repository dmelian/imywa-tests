<?php

class sendForm{
	public $html;
	public $className= 'form';
	public $widgets= array(); // id => array(type, options);
	public $log;
}



$form= new sendForm();

$form->className= 'ma-wdForm';

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

$form->log= "SERVER:" . print_r($_SERVER, true);
$form->log.= "GET" . print_r($_GET, true);
$form->log.= "POST" . print_r($_POST, true);


//TODO: include options : $form->widgets['backup']= array('type'=>'button', 'options'=>??? );
echo json_encode($form);