# function usage


# ...

{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell 
{
	nativeBuildInputs = with pkgs; [
		nodejs
        pnpm
	];

	shellHook = ''
		if [ ! -f package.json ]; then
			echo "No package.json found, initializing a new one..."
			pnpm init

			pnpm create t3-app@latest

			pnpm postinstall
			pnpm db:generate
		fi

        pnpm install  
				cd ./client && pnpm install    

        trap "exit" INT  # Set a trap for SIGINT (Ctrl-C) to exit the shell
		
        # exec pnpm run dev  # Replaces the shell with the pnpm process

	'';
}
