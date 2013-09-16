<?php

class sendForm{
	public $html;
	public $className= 'form';
	public $widgets= array(); // id => array(type, options);
	public $log;
}



$form= new sendForm();
$form->html= '<h1>Formulario 1</h1>';
$form->html.= '<p>Este es un formulario descargado de internet</p>';
$form->html.= '<button id="continue">Continue</button>';
$form->html.= '<button id="pause">Pause</button>';
$form->html.= '<button id="restore">Restore database</button>';
$form->className= 'maForm';
$form->widgets['continue']= 'button';
$form->widgets['pause']= 'button';
$form->widgets['restore']= 'button';
$form->log= "SERVER:" . print_r($_SERVER, true);
$form->log.= "GET" . print_r($_GET, true);
$form->log.= "POST" . print_r($_POST, true);


//TODO: include options : $form->widgets['backup']= array('type'=>'button', 'options'=>??? );
echo json_encode($form);