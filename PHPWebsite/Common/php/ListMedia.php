<?php
	class ListMedia {
		public $_mediaDirectory;
		public $_mainMediaDirectory;

		function getJson($directory, $mainDirectory) {
			if(is_dir($directory)) {
				return $this->getDirectoryData($directory, $mainDirectory);
			} else {
				return  "Not type of directory";
			}
		}

		function getDirectoryData($directory, $mainDirectory) {
			$files = scandir($directory); // Sort in ascending order - this is default
			$media = ""; // Creating json Object
			
			for($i = 0; $i < count($files); $i++) {

				$fileExtension = pathinfo( $files[$i], PATHINFO_EXTENSION);	// Getting the file extension
				$mediaDir = $mainDirectory; // Directory where the images will be found
				$mediaArr = array("jpg","jpeg","png","mp4");

				if($fileExtension != "") {
					if(in_array($fileExtension,$mediaArr,true)) {

						$mediaType = "image";

						if($fileExtension == "mp4") {
							$mediaType = "video";
						}

						$obj = 	"{" .
							"	\"url\":\"".$mediaDir.$files[$i]."\"," .
							"	\"type\":\"".$mediaType."\"" .
							"}";

						$media = ($media == "") ? $obj : $media . ",". $obj;
					}
				}		
			}

			$json = "[" . $media . "]";
			return $json;
		}
	}

	$_ListMedia = new ListMedia();
?>