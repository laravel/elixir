<?php

if ( ! function_exists('elixir'))
{
	/**
	 * Get the path to a versioned Elixir file.
	 *
	 * @param  string  $file
	 * @return string
	 */
	function elixir($file)
	{
		static $manifest = null;

		if (is_null($manifest))
		{
			$manifest = json_decode(public_path().'/build/.json', true);
		}

		$basePath = public_path().'/build';

		if (isset($manifest[$file]))
		{
			return public_path.'/build/'.$manifest[$file];
		}

		throw new InvalidArgumentException("File not defined in asset manifest.");
	}

}
