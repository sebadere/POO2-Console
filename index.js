require('oow');

const { suite, test, before, assertTrue, assertFalse, assertEquals } = require('@Sdere/testy');
const { Console, User, File, Dir } = require('./consola');

suite('Console', () => {
  before(() => {
    let console = new Console(new Dir("rootDir"),new User("Sebastian","1234"));
    return {
       console: console
    }
  });
 
 //Tests

test('TEST 01: La suma de usuarios inicialmente es 1.',(c) => {
  return assertTrue(c.console.usersCount()==1);
});

test('TEST 02: root logeado.',(c) => {
  c.console.logIn(new User("Sebastian","1234"));
  return assertTrue(c.console.rootUserLoged());
 
});

test('TEST 03: sesion con otro usuario no root.',(c) => {
  c.console.register(new User("Fachita","123"));
  c.console.logIn(new User("Fachita","123"));
  return assertFalse(c.console.rootUserLoged());
 
});


test('TEST 04: login de usuario.',(c) => {
  c.console.register(new User("Fachita","123"));
  return assertFalse(c.console.logIn(new User("Fax","123")));
 
});

 test('TEST 05: Admin solo registra usuarios.', (c) => {
    c.console.register(new User("Fachita", "12345"));
    c.console.logIn(new User("Fachita", "12345"));
    c.console.register(new User("Fachitax", "12345"));
    return assertTrue(c.console.usersCount()==2);

});

test('TEST 06: Eliminar usuarios como root',(c) =>{
  c.console.register(new User("Fachita", "12345"));
  c.console.delete(new User("Fachita", "12345"));
  return assertTrue(c.console.usersCount() == 1);
})
test('TEST 07: Not root user no puede eliminar',(c) => {
  c.console.register(new User("Fachita", "12345"));
  c.console.register(new User("Fachita1", "12345"));
  c.console.logIn(new User("Fachita","12345"));
  c.console.delete(new User("Fachita1", "12345"));
  return assertTrue(c.console.usersCount() == 3);

})
 
test('TEST 08: Verificar que el directorio inicial es el raiz',(c) =>{
    c.console.logIn(new User("Fachita","12345"));
    return assertTrue(c.console.inRootDir());
})



test('TEST 09: Creacion de contenido',(c) => {
  c.console.createContent(new Dir("carpeta00"));
  return assertTrue(c.console.currDir.countContent()==1);
})

test('TEST 10: Eliminacion de contenido',(c)=>{
  c.console.createContent(new Dir("carpeta00"));
  c.console.createContent(new Dir("carpeta01"));
  c.console.deleteContent(new Dir("carpeta00"))
  return assertTrue(c.console.currDir.countContent()==1);
})



test('TEST 11: Comando cd',(c)=>{
  c.console.logIn(new User("Fachita","12345"));
  c.console.createContent(new Dir("carpeta00"));
  c.console.createContent(new Dir("carpeta01"));
  c.console.cd(new Dir("carpeta00"));
  return assertFalse(c.console.inRootDir());
})

test('TEST 12: Directorio nuevo vacio',(c)=>{
  c.console.logIn(new User("Fachita","12345"));
  c.console.createContent(new Dir("carpeta00"));
  c.console.createContent(new Dir("carpeta01"));
  c.console.cd(new Dir("carpeta00"));
  return assertTrue(c.console.getCurrDir().emptyDir());
})


/*
test('TEST 13: Comando ls: muestra contenido del directorio',(c)=>{
  c.console.logIn(new User("Fachita","12345"));
  c.console.createContent(new Dir("carpeta00"));
  c.console.cd(new Dir("carpeta00"));
  c.console.createContent(new Dir("carpeta01"));
  c.console.ls();
  return assertTrue(c.console.sameContent(new Dir("carpeta01")));
})
*/

test('TEST 13: Dar permisos a usuario',(c)=>{
  let usuario1 = new User("Fachita","12345");
  let archivo1 = new File("archivo01","datos");
  archivo1.givePermissionTo(usuario1);
  return assertTrue(archivo1.getPermissionCount()==1);
})

test('TEST 14: Ver contenido de archivo',(c)=>{
  let usuario1 = new User("Fachita","12345");
  let archivo1 = new File("archivo01","datos");
  archivo1.givePermissionTo(usuario1);
  return assertTrue(archivo1.getContent(usuario1));
})


test('TEST 15: Usuario sin permiso no puede ver contenido de archivo',(c)=>{
  let usuario1 = new User("Fachita","12345");
  let usuario2 = new User("bocajuniors","12345");
  let archivo1 = new File("archivo01","datos");
  archivo1.givePermissionTo(usuario1);
  return assertFalse(archivo1.getContent(usuario2));
})



});