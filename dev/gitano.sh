#!/usr/bin/env bash

# ALREADY WORKING!!

# ------------ Git-Settings-Info ----------
function gitanosettingsinfo () {
	echo " (*) Your current settings [git config --list]:"
    git config --list
}
alias gitanosettingsinfo="gitanosettingsinfo"

# ------------ Git-List-Repositories-URL ---------
function gitanolistrepositories () {
	echo " (*) Your current repositories [git remote -v]"
	git remote -v
}
alias gitanolistrepositories="gitanolistrepositories"

# ------------ Git-Login ---------------
function gitanologin () {
    echo " (*) Asking for credentials' data"
    local USERNAME EMAIL PASSWORD
    read -p  " - Type the user's @name: " USERNAME 
    read -p  " - Type the user's @email: " EMAIL 
    read -sp " - Type the user's @password: " PASSWORD 
    echo " (*) Setting username in git configs [git config user.name $USERNAME]"
    git config user.name "$USERNAME"
    echo " (*) Setting email in git configs [git config user.email $EMAIL]"
    git config user.email "$EMAIL"
    echo " (*) Setting password in git configs [git config user.password XXX]"
    git config user.password "$PASSWORD"
    echo " (*) Saving this data in cache [git config credential.helper store]"
    git config credential.helper store
    echo " (*) Your current settings [git config --list]:"
    git config --list
}
alias gitanologin="gitanologin"

# ------------ Git-Create-Repository-URL ---------
function gitanocreaterepository () {
	echo " (*) Asking for repository's data...:"
	local REPOSITORY_URL
	echo " (*) First remote repository will be 'origin'."
	echo " (*) And first local branch will be 'master'."
	read -p " - URL of the repository (*.git): " REPOSITORY_URL
	echo " (*) Creating default README.md file [touch README.md]"
	touch README.md
	echo "# Read this file" >> README.md
	echo " (*) Adding README.md to commit [git add README.md]"
	git add README.md
	echo " (*) Commiting changes with message 'First commit' [git commit -m 'First commit']"
	git commit -m "First commit"
	echo " (*) Creating remote repository 'origin' at URL $REPOSITORY_URL [git remote add origin $REPOSITORY_URL]"
	git remote add origin $REPOSITORY_URL
	echo " (*) Pushing the first branch 'master' to 'origin' [git push -u origin master]"
	git push -u origin master
}
alias gitanocreaterepository="gitanocreaterepository"

# ------------ Git-Set-Repository-URL ---------
function gitanosetrepositoryurl () {
	echo " (*) Listing current repositories"
	git remote -v
	echo " (*) Asking for the repository you want to change its URL"
	local REPOSITORY_NAME
	read -p " - Type the remote repository @name which you'd want to change its URL (origin): " REPOSITORY_NAME
	local REPOSITORY_URL
	read -p " - Type the new repository @URL (*.git): " REPOSITORY_URL
	echo " (*) Set repository's new URL [git remote set-url $REPOSITORY_NAME $REPOSITORY_URL]"
	git remote set-url $REPOSITORY_NAME $REPOSITORY_URL
}
alias gitanosetrepositoryurl="gitanosetrepositoryurl"

#------------- Git-Initialize ----------
function gitanoinitialize () {
    echo " (*) This process will go by:"
    echo " (1) GIT Project Initialization"
    echo " (2) GIT Login"
    echo " (3) GIT Create Repository"
    git init
    gitanologin
    gitanocreaterepository
}
alias gitanoinitialize="gitanoinitialize"

#------------- Git-Update-Branches -------
function gitanoupdatebranches () {
	echo " (*) Updating branches from remote repository [git fetch --all]"
	git fetch --all
}
alias gitanoupdatebranches="gitanoupdatebranches"

#------------ Git-Update-Branch --------
function gitanoupdatebranch () {
	echo " (*) Updating branch from remote repository [git pull origin]"
}
alias gitanoupdatebranch="gitanoupdatebranch"

alias gitanodifferences="gitanodifferences"

#------------- Git-Commit -------
function gitanocommit () {
    echo " (*) Commiting"
    echo " (*) Commiting with message $1"
    echo " (*) Commiting branch: x"
    echo " (*) Commiting message: x"
    echo " (*) Commiting files: x"
    read -p "Is it okay? (y/N)" -n 1 -r
    echo
	echo  
	if [[ ! $REPLY =~ ^[YyEeSs]?$ ]]; then 
		echo " (*) Abort commit."
	fi
    echo " (*) Commiting changes to local"
    git commit
}
alias gitanocommit="gitanocommit"

#------------- Git-Push -------
function gitanopush () {
    echo " (*) Pushing"
    echo
    echo " (*) Push Info -----------------------------"
    echo " (*) Current branch: $(gitanobranch)"
    echo " (*) Current user: $(gitanouser)"
    echo " (*) Current email: $(gitanoemail)"
    echo " (*) Current repository: $(gitanorepository)"
    echo " (*) Current commit message: $(gitanocommitmessage)"
    echo " (*) Current commit differences:"
    gitanodifferences
    echo
    read -p " - ¿Commit changes to local branch now ($(gitanobranch))? (y/N)" -n 1 -r
    echo
	if [[ ! $REPLY =~ ^[YyEeSs]$ ]]
	then
		echo 
		echo " (*) Abort commit."
		return 0
	fi
	echo 
    echo " (*) Commiting changes to local [git commit]"
    git commit 
	echo
	echo " (*) Last commit message: $(gitanocommitmessage)"
	echo " (*) Current repository:   $(gitanorepository)"
	echo " (*) Current branch:       $(gitanobranch)"
	echo
	read -p " - ¿Push changes to remote branch now ($(gitanobranch))? (y/N)" -n 1 -r 
	echo
	if [[ ! $REPLY =~ ^[YyEeSs]$ ]]
	then 
		echo 
		echo " (*) Abort push."
		return 0
	fi
	echo
	read -p " - ¿Are you sure? (y/N)" -n 1 -r 
	echo
	if [[ ! $REPLY =~ ^[YyEeSs]$ ]]
	then
		echo " (*) Abort push."
		return 0
	fi
	echo 
    echo " (*) Pushing changes to remote /origin/$(gitanobranch) [git push origin $(gitanobranch)]"
    git push -u origin "$(gitanobranch)"
    echo
}
alias gitanopush="gitanopush"

#------------- Git-Add-File -------
function gitanoaddfiles () {
    if [ $# -eq 0 ]
	then
		echo " (*) Listing differences: $@"
		git diff
	else 
		echo " (*) Adding files: $@"
	fi
    for file in "$@"
    do
	echo " (*) Adding file: $file [git add $file]"
	git add $file
    done
}
alias gitanoaddfiles="gitanoaddfiles"
alias gitanoaddfile="gitanoaddfiles"
#------------- Git-Delete-Files -------
function gitanodeletefiles () {
    if [ $# -eq 0 ]
	then
		echo " (*) Listing differences: $@"
		git diff
	else 
		echo " (*) Deleting files: $@"
	fi
    for file in "$@"
    do
	echo " (*) Deleting file: $file [git rm $file]"
	git rm -f $file
    done
}
alias gitanodeletefiles="gitanodeletefiles"
alias gitanodeletefile="gitanodeletefiles"
#------------- Git-Delete-Branch --------
function gitanodeletebranch () {
	echo " (*) Delete branch"
	git branch
	local BRANCH_DELETABLE
	read -p " - Type the branch you want to delete: " BRANCH_DELETABLE
	echo " (*) Deleting branch $BRANCH_DELETABLE"
	read -p " - ¿Are you sure? (y/N)" -n 1 -r 
	echo
	if [[ ! $REPLY =~ ^[YyEeSs]$ ]]; then
		echo " (*) Abort deleting branch."
		return 0
	fi
    echo " (*) Finally deleting branch $BRANCH_DELETABLE"
    git branch -d $BRANCH_DELETABLE
}
alias gitanodeletebranch="gitanodeletebranch";

#------------- Git-Delete-Branch --------
function gitanodeletebranches () {
	echo " (*) Delete branches $@"
	echo " (*) Current branches [git branch]"
	git branch
	local BRANCH_DELETABLE
	for branch in "$@"
    do
	echo " (*) Deleting branch: $branch [git branch -d $branch]"
	git branch -d $branch
    done
}
alias gitanodeletebranches="gitanodeletebranches"

#------------- Git-Clean -------
function gitanoclean () {
	echo " (*) Cleaning untracked files and directories"
	echo " (*) Showing what would be cleaned: [git clean -n]"
	git clean -n
	read -p " - ¿Are you sure? (y/N)" -n 1 -r 
	echo
	if [[ ! $REPLY =~ ^[YyEeSs]$ ]]; then
		echo "*) Abort cleaning files and directories."
		return 0
	fi
	echo " (*) Cleaning files and directories [git clean -f]"
	git clean -f
}
alias gitanoclean="gitanoclean"
#------------- Git-Current-Branch -------
function gitanobranch () {
	git symbolic-ref --short HEAD
}
alias gitanobranch="gitanobranch"

#------------- Git-Current-User -------
function gitanouser () {
	git config user.name
}
alias gitanouser="gitanouser"

#------------- Git-Current-Email -------
function gitanoemail () {
	git config user.email
}
alias gitanoemail="gitanoemail"

#------------- Git-Current-Repository -------
function gitanorepository () {
	basename `git rev-parse --show-toplevel`
}
alias gitanorepository="gitanorepository"

#------------- Git-Current-Commit-Message -------
function gitanocommitmessage () {
	git log -1
}
alias gitanocommitmessage="gitanocommitmessage"

#------------- Git-Create-Local-Branch --------
function gitanocreatelocalbranch () {
	echo " (*) Listing current branches in remote:"
    local BRANCH BRANCH_ORIGIN
    echo " (*) Asking for branch-creation details"
    read -p " - Type the name of the new branch you want to create: " BRANCH
    read -p " - Type the name of the brand you want to extend: " BRANCH_ORIGIN
    if [[ -z $BRANCH_ORIGIN ]]; then
    	BRANCH_ORIGIN="$(gitanobranch)"
    fi
    echo " (*) Creating branch [git checkout -b $BRANCH $BRANCH_ORIGIN]"
    git checkout -b "$BRANCH" "$BRANCH_ORIGIN"
}
alias gitanocreatebranch="gitanocreatebranch"

#------------- Git-Change-Branch -------
function gitanochangebranch () {
	local BRANCH
    echo " (*) Current branch: $(gitanobranch)"
    echo " (*) Available branches: [git branch]"
    git branch
    read -p " - Type the branch's name to switch to: " BRANCH
    echo " (*) Switching current branch $(gitanobranch) to $BRANCH [git checkout $BRANCH]"
    git checkout "$BRANCH"
    echo " (*) Showing last commits in branch $BRANCH [git log --pretty=oneline --abbrev-commit]"
    git log --pretty=oneline --abbrev-commit
}
alias gitanochangebranch="gitanochangebranch"

#------------- Git-Create-Branch -------
function gitanocreatebranch () {
	echo " (*) Listing current branches in local [git branch]"
	git branch
	echo " (*) Listing current branches in remote [git ls-remote --heads origin]"
	git ls-remote --heads origin
    local BRANCH BRANCH_ORIGIN
    echo " (*) Asking for new branch details"
    read -p " - Type the name of the new branch you want to create: " BRANCH
    read -p " - Type the name of the brand you want to extend (empty for default): " BRANCH_ORIGIN
    if [[ -z $BRANCH_ORIGIN ]]; then
    	BRANCH_ORIGIN="$(gitanobranch)"
    fi
    echo " (*) Creating:"
    echo " (*) In repository:           $(gitanorepository)"
    echo " (*) From local branch:       $BRANCH_ORIGIN"
    echo " (*) Creating remote branch:  $BRANCH"
    echo " (*) Creating local branch $BRANCH from original branch $BRANCH_ORIGIN [git checkout -b $BRANCH $BRANCH_ORIGIN]"
    read -p "Is it okay? (y/N)" -n 1 -r
    echo
	echo  
	if [[ ! $REPLY =~ ^[YyEeSs]?$ ]]; then 
		echo " (*) Abort commit."
		return 0
	fi
	echo " (*) Creating branch $BRANCH locally [git checkout -b $BRANCH]"
	git checkout -b "$BRANCH"
    echo " (*) Commiting branch creation [git commit -m @autogeneratedmessage]"
	git commit -m "Creating branch $BRANCH"
	echo " (*) Pushing branch creation [git -u push origin $BRANCH]"
	git push -u origin "$BRANCH"
}
alias gitanocreatebranch="gitanocreatebranch"

# NOT WORKING YET...



#------------- Git-Exists-Branch -------
function gitanobranches () {
	local BRANCH BRANCH_ID
	echo " (*) Available branches with last commits: [git branch -vv]"
	git branch -vv
	read -p " - Type the branch you want to pick the UUID: " BRANCH
	echo " (*) Checking the branch UUID [git rev-parse --verify $BRANCH]"
	BRANCH_ID=$(git rev-parse --verify "$BRANCH")
	if [[ "$BRANCH_ID" == "" ]]; then
		echo "No, the branch $BRANCH does not exists."
	else
		echo "The UUID of the branch is:"
		echo
		echo 
		echo
		echo "        $BRANCH_ID       "
		echo 
		echo
		echo
	fi
}
#------------- Git-History-Branch -------
function gitanohistory () {
	if [ -z "$1" ]
	then
		echo " (*) Checking history of current branch [git log]"
		git log
	fi
	echo " (*) Checking history of file [git log $1]"
	git log "$1"
}
alias gitanohistory="gitanohistory"
#------------- Git-Differences -------
function gitanodifferences () {
    echo " (*) Showing differences between current commit and previous commit:"

}
alias gitanodifferences="gitanodifferences"
#------------- Git-Solve-Differences -------
function gitanosolvedifferences () {
    echo " (*) Solving differences"
    git difftool --prompt
}
#------------- Git-Current-Differences -------
function gitanodifferences () {
	git diff --name-only --diff-filter=U
}
alias gitanodifferences="gitanodifferences"
#------------- Git-Solve-Differences -------------
function gitanosolvedifferences () {
	echo " (*) Solving pending differences between last pushed file and current commited file [git difftool --prompt"
	git difftool --prompt
}
alias gitanosolvedifferences="gitanosolvedifferences"
#------------- Git-Current-Commit-Information -------
function gitanocommitinformation () {
	gitanobranch
	gitanouser
	gitanoemail
	gitanorepository
	gitanocommitmessage
	gitanodifferences
}
alias gitanocommitinformation="gitanocommitinformation"
#------------- Git-Mix-Branch- -------
function gitanomixbranch () {
    echo " (*) Mixing current branch"   
    echo " (*) Mixing current branch with branch $1"
    echo " (1) Copy current branch in a temporary folder" 
    echo " (2) Delete current branch" 
    echo " (3) Create same-named branch, but from the branch we want to mix"
    echo " (4) Add branch files to current same-named branch" 
}
alias gitanomixbranch="gitanomixbranch"
#------------- Git-Status -------
function gitano () {
    if [[ -z "$1" ]]; then
    	echo " (*) Current commit status"
    	git status
    	echo " (*) Showing branches sorted by last commit [...]"
		# git for-each-ref --sort=committerdate refs/heads/ --format='%(committerdate) %(refname)'
		for branch in `git branch | sed s/^..//`; do
		    echo -e `git log -1 --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" "$branch"`\\t"$branch";
		done | sort -r
    	return 0
    fi
	echo " (*) Showing status of file $1 [git status $1]"
	git status "$1"
}
alias gitano="gitano"
#------------- Git-Remove-Files -------
function gitanoremovefiles () {
    echo " (*) Removing files"
    echo " (*) Removing file $1"
    if [ $# -eq 0 ]
	then
		echo " (*) Listing differences: $@"
		git diff
	else 
		echo " (*) Removing files: $@"
	fi
    for file in "$@"
    do
		echo " (*) Removing file: $file [git rm -f $file]"
		git rm -f $file
    done
}
alias gitanoremovefiles="gitanoremovefiles"
alias gitanoremovefile="gitanoremovefiles"
#------------- Git-Remove-Remote-File -------
function gitanoremoveremotefiles () {
    echo " (*) Removing remote files"
    echo " (*) Removing remote file $1"
    if [ $# -eq 0 ]
	then
		echo " (*) Listing differences: $@"
		git diff
	else 
		echo " (*) Removing remote files: $@"
	fi
    for file in "$@"
    do
		echo " (*) Removing remote file: $file [git rm --cached $file]"
		git rm --cached $file
    done
}
alias gitanoremoveremotefiles="gitanoremoveremotefiles"
alias gitanoremoveremotefile="gitanoremoveremotefiles"
#------------- Git-Revert-File -------
function gitanorevertfiles () {
    echo " (*) Reverting files"
    if [ $# -eq 0 ]
	then
		echo " (*) Listing differences: $@"
		git diff
	else 
		echo " (*) Reverting files: $@"
	fi
    for file in "$@"
    do
		echo " (*) Reverting file: $file [git checkout -- $file]"
		git checkout -- $file
    done
}
alias gitanorevertfiles="gitanorevertfiles"
alias gitanorevertfile="gitanorevertfiles"
#------------- Git-Revert-Commit -------
function gitanorevertcommit () {
    echo " (*) Reverting commit"
    echo " (*) Reverting current commit to last commit [git reset --hard]"
    git reset --hard
}
alias gitanorevertcommit="gitanorevertcommit"
#------------- Git-Clone -------
function gitanoclone () {
    echo " (*) Cloning project"
	if [ $# -eq 0 ]
	then
		echo " (*) Listing differences: $@"
		git diff
	fi
	if [ $# -eq 1 ]
	then
		echo " (*) Cloning project $1 [git clone $1]"
		git clone $1
	fi
	if [ $# -eq 2 ]
	then
	    echo " (*) Cloning branch $2 of project $1 [git clone -b $2 $1]"
		git clone -b $2 $1
	fi
}
alias gitanoclone="gitanoclone"
#------------- Git-Move-File --------
function gitanomovefile () {
	echo " (*) Moving a file"
	echo " (*) Moving a file from $1 to $2 [git mv $1 $2]"
	git mv $1 $2
}
alias gitanomovefile="gitanomovefile"
alias gitanorenamefile="gitanomovefile"
