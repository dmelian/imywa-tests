<?php

class sendForm{
	public $html;
	public $className= 'form';
	public $widgets= array(); // id => array(type, options);
}

$form= new sendForm();
$form->html= '<h1>Formulario 1</h1>';
$form->html.= '<p>Este es un formulario descargado de internet</p>';
$form->html.= '<button id="continue">Continue</button>';
$form->html.= '<button id="pause">Pause</button>';
$form->html.= '<button id="restore">Restore database</button>';
$form->className= 'formpio';
$form->widgets['continue']= 'button';
$form->widgets['pause']= 'button';
$form->widgets['restore']= 'button';
//TODO: include options : $form->widgets['backup']= array('type'=>'button', 'options'=>??? );

echo json_encode($form);