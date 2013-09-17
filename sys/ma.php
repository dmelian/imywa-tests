<?php

class sendForm{
	public $html;
	public $className= 'form';
	public $widgets= array(); // id => array(type, options);
	public $log;
}



$form= new sendForm();

$form->formClass= array('namespace'=>'ma', 'className'=>'maForm');

$form->widgets['continue']= array('namespace'=>'ui','className'=>'button');
$form->widgets['pause']= array('namespace'=>'ui','className'=>'button');
$form->widgets['restore']= array('namespace'=>'ui','className'=>'button','options'=>array('disabled'=>true));
$form->widgets['mabutton']= array('namespace'=>'ma','className'=>'maButton');
$form->widgets['login']= array('namespace'=>'ma', 'className'=>'maTextBox');
$form->widgets['login1']= array('namespace'=>'ma', 'className'=>'maTextBox');
$form->widgets['login2']= array('namespace'=>'ma', 'className'=>'maTextBox');

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