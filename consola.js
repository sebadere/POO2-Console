
// La clase Console crea la cosola.
class Console {
	constructor(rootDir,admin){
		this.admin = admin;
		this.users = [this.admin];
		this.inSession = admin; 
		this.rootDir = rootDir;
		this.currDir= this.rootDir;
	}
	
	getAdmin(){
		return this.admin;
	}
	getUser(){
		return this.user;
	}
	getRootDir(){
		return this.rootDir
	}
	getCurrDir(){
		return this.currDir;
	}

	//De usuario
	register(user){
		if(this.rootUserLoged()){
			if (user.nameValidation()){
				this.users.push(user);
			}
		}
	}
	logIn(user){
		var u; 
		for (u in this.users){
			if (this.users[u].validation(user)){
				this.inSession = user; 
				return true;
			}
		}
		return false;
	}
	delete(user){
		var u; 
		var i=0;
		if(this.rootUserLoged()){
			for(u in this.users){
				if(this.users[u].validation(user)){
					this.users.splice(i, 1);
				}
				i = i+1;
			}
		}
	}


	//comandos
	cd(dir) {
		var i;
		for (i in this.currDir.getContent()) {
			if (dir.isDir() && this.currDir.getContent()[i].sameContent(dir)) {
				this.currDir = this.currDir.getContent()[i];
				break;
			}
		}
	}


	ls(){
		var i; 
		for (i in this.currDir.getContent()){
			console.log(this.currDir.getContent()[i].getName());
		}
		return this.currDir.getContent();
	}

	//De contenido
	createContent(content){
		if(this.rootUserLoged()){
			this.getCurrDir().getContent().push(content);
		}
	}

	deleteContent(contenido){
		var u;
		var i=0;
		if(this.rootUserLoged()){
			for (u in this.getCurrDir().getContent()){
				if(this.getCurrDir().getContent()[u].sameContent(contenido)){
					this.getCurrDir().getContent().splice(i,1);
				}		
			}
			
		}
	}
	

	

	//De control 
	usersCount(){
		return this.users.length;
	}
	rootUserLoged(){
		return this.inSession.validation(this.admin);
	}

	inRootDir(){
		return this.currDir == this.rootDir;
	}

	
}


// La clase user crea los usuarios 
class User{
	constructor(name, pwr){
		this.name = name;
		this.pwr = pwr; 
	}

	getName(){
		return this.name;
	}

	getPwr(){
		return this.pwr;
	}

	validation(user){
		return this.getName() == user.getName() && this.getPwr() == user.getPwr();
	}
	nameValidation(){
		let regEx = /^([a-z0-9\-\_]{6,25})$/;
		return regEx.test(this.getName.value);
	}
}


class Dir{
	constructor(name) {
		this.name = name;
		this.content = [];
		this.permissionTo = [];
		this.type = "folder";
	}

	getName(){
		return this.name;
	}
	getContent(){
		return this.content;
	}
	getType(){
		return this.type;
	}
	isDir(){
		return true;
	}

	sameContent(contenido){
		return this.getName()==contenido.getName() && this.getType() == contenido.getType();
	
	}

	contentVerification(contenido){
		var i;
		var b = false;
		for(i in this.content){
			r = r || this.content[i].sameContent(contenido);
		}
		return r;
	}

	countContent(){
		return this.content.length;
	}

	emptyDir(){
		return this.content.length == 0;
	}
}


class File{
	constructor(name,data){
		this.name = name; 
		this.data = data;
		this.permissionTo = [];
		this.type = "file";
	}

	getName(){
		return this.name;
	}
	getPermissionTo(){
		return this.permissionTo;
	}

	getPermissionCount(){
		return this.permissionTo.length;
	}

	getType(){
		return this.type;
	}

	getContent(user){
		var i; 
		var r=false;
		for(i in this.permissionTo){
			r = r || this.permissionTo[i].validation(user);
		}
		return r;
	}


	givePermissionTo(user){
		return this.permissionTo.push(user);
	}

	isFile(){
		return true;
	}

	sameContent(content) {
		return this.getName() == content.getName() && this.getType() == content.getType();
	}
}


module.exports = {
	Console: Console,
	User: User,
	Dir: Dir,
	File: File
};
