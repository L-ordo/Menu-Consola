import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, leerInput, pausa, listadoTareasBorrar, confirmar, mostrarListadoChecklist  } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';




const main = async() =>{

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ){ //Cargar tareas

        tareas.cargarTareasFromArray( tareasDB );

    }
  
    do {

        opt = await inquirerMenu();
      
        
        switch (opt) {
                case '1':
                    const desc = await leerInput('Descripcion:');
                tareas.crearTarea( desc );
                break;

                 case '2':
                    tareas.listadoCompleto();
                break;
                case '3': //Listar Completadas
                    tareas.listarPendientesCompletadas(true);
                break;

                case '4': //Listar Pendientes
                    tareas.listarPendientesCompletadas(false);
                break;
                case '5': //Completado !! Pendiente
                    const ids= await mostrarListadoChecklist(tareas.listadoArr);
                    tareas.togggleCompletadas( ids );
                 break;
                case '6': //Borrar
                    const id = await listadoTareasBorrar( tareas.listadoArr);
                    if ( id !=='0'){
                        const ok = await confirmar('Estas seguro?')
                        if( ok ){
                            tareas.borrarTarea(id);
                            console.log('Tarea Borrada'); 
                        }
                    }
                   
                    break;

        }

         guardarDB( tareas.listadoArr );

        await pausa();

    } while (opt !== '0');
    

    // pausa();
}




main();