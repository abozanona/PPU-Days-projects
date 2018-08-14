<?php
class AE_MobileDetect {
    /**
	 * 
	*/
	protected $accept;
	/**
	 * 
	*/
	protected $userAgent;
	/**
	 * 
	*/
	protected $isMobile = false;
	protected $isAndroid = null;
	protected $isAndroidtablet = null;
	protected $isIphone = null;
	protected $isIpad = null;
	protected $isBlackberry = null;
	protected $isBlackberrytablet = null;
	protected $isOpera = null;
	protected $isPalm = null;
	protected $isWindows = null;
	protected $isWindowsphone = null;
	protected $isGeneric = null;

	/**
	 * list of supported device
	*/
	protected $devices = array(
		"android" => "android.*mobile",
		"androidtablet" => "android(?!.*mobile)",
		"blackberry" => "blackberry",
		"blackberrytablet" => "rim tablet os",
		"iphone" => "(iphone|ipod)",
		"ipad" => "(ipad)",
		"palm" => "(avantgo|blazer|elaine|hiptop|palm|plucker|xiino)",
		"windows" => "windows ce; (iemobile|ppc|smartphone)",
		"windowsphone" => "Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7",
		"generic" => "(kindle|mobile|mmp|midp|pocket|psp|symbian|smartphone|treo|up.browser|up.link|vodafone|wap|opera mini)"
	);

	public static $instance;

	/**
	 * contruct object function
	*/
	public function __construct()
	{
		$this->userAgent = $_SERVER['HTTP_USER_AGENT'];
		$this->accept = $_SERVER['HTTP_ACCEPT'];

		if (isset($_SERVER['HTTP_X_WAP_PROFILE']) || isset($_SERVER['HTTP_PROFILE'])) {
			$this->isMobile = true;
		} elseif (strpos($this->accept, 'text/vnd.wap.wml') > 0 || strpos($this->accept, 'application/vnd.wap.xhtml+xml') > 0) {
			$this->isMobile = true;
		} else {
			foreach ($this->devices as $device => $regexp) {
				if ($this->isDevice($device)) {
					$this->isMobile = true;
				}
			}
		}
	}

	public static function get_instance() {
		if(self::$instance == null) {
			self::$instance	=	new ET_MobileDetect ();
		}
		return self::$instance;
	}

	/**
	 * Overloads isAndroid() | isAndroidtablet() | isIphone() | isIpad() | isBlackberry() | isBlackberrytablet() | isPalm() | isWindowsphone() | isWindows() | isGeneric() through isDevice()
	 *
	 * @param string $name
	 * @param array $arguments
	 * @return bool
	 */
	public function __call($name, $arguments) {
		$device = substr($name, 2);
		if ($name == "is" . ucfirst($device) && array_key_exists(strtolower($device), $this->devices)) {
			return $this->isDevice($device);
		} else {
			trigger_error("Method $name not defined", E_USER_WARNING);
		}
	}

	/**
	 * Returns true if any type of mobile device detected, including special ones
	 * @return bool
	 */
	public function isMobile() {
		return $this->isMobile;
	}

	/**
	 * check a divce
	 * @param string $device device name input
	 * @return bool
	*/
	protected function isDevice($device) {
		$var = "is" . ucfirst($device);
		$return = $this->$var === null ? (bool) preg_match("/" . $this->devices[strtolower($device)] . "/i", $this->userAgent) : $this->$var;
		if ($device != 'generic' && $return == true) {
			$this->isGeneric = false;
		}

		return $return;
	}

}


$detector = new AE_MobileDetect();
$x="";
$y="";
if($detector->isIphone())
	$x= "It's a phone\n";
else
	$x= "It's a PC\n";

if($detector->isAndroid())
	$y= "It's Android\n";
if($detector->isAndroidtablet())
	$y= "It's Androidtablet\n";
if($detector->isIphone())
	$y= "It's Iphone\n";
if($detector->isIpad())
	$y= "It's Ipad\n";
if($detector->isBlackberry())
	$y= "It's Blackberry\n";
if($detector->isBlackberrytablet())
	$y= "It's Blackberrytablet\n";
if($detector->isPalm())
	$y= "It's Palm\n";
if($detector->isWindowsphone())
	$y= "It's Windowsphone\n";
if($detector->isWindows())
	$y= "It's Windows\n";
if($detector->isGeneric())
	$y= "It's Generic\n";

echo '</pre>';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>comming soon</title>
<link href="tools/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="tools/jquery.min.js"></script> 
<script type="text/javascript" src="tools/cufon-yui.js"></script>
<script type="text/javascript" src="tools/Abraham_Lincoln_400.font.js"></script>
<script type="text/javascript" src="tools/Inspiration_400.font.js"></script>
<script type="text/javascript" src="tools/Museo_Slab_100_400-Museo_Slab_700_400.font.js"></script>
<script type="text/javascript">
	Cufon.replace(' h1', {fontFamily: 'Inspiration'});
	Cufon.replace('h2', {fontFamily: 'Museo Slab 100'});
	Cufon.replace('h2 span', {fontFamily: 'Abraham Lincoln'});
	Cufon.replace('p.big_text, p.small_text', {fontFamily: 'Museo Slab 100'});
	Cufon.replace('p.big_text strong, p.small_text strong', {fontFamily: 'Museo Slab 700'});
</script>


</head>
<body>
<div id="transy">
</div>
<div id="wrapper">
	<div class="logo">
		<h1>MyMopileType</h1>
		<h2><strong class="one">CodeClup</h2>
	</div>
	<div class="content">
		<br/>
		<br/>
		<br/>
		<h1><?= $x ?></h1>
		<br/>
		<br/>
		<br/>
		<h1><?= $y ?></h1>
	</div>
</div>
</body>
</html>
