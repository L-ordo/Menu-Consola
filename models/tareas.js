import { Tarea } from "./tarea.js";


class Tareas {

    _listado = {};

    get listadoArr(){

        const listado =[];

        Object.keys(this._listado).forEach( key=>{
            const tarea = this._listado[key];
            listado.push( tarea );
        } );

        return listado;

    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id='' ){

        if(this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach( tarea =>{
            this._listado[ tarea.id ] = tarea;
        });

    }


    crearTarea( des=''){

        const tarea = new Tarea(des);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach( ( tarea, i ) =>{
            const idx = `${i+1}`.green;
            const { desc, competadoEn } = tarea;
            const estado = ( competadoEn )
                    ?'Completada'.green
                    :'Pendiente'.red;
            
                    console.log(`${idx} ${desc} :: ${estado} `);

        })

    }

    listarPendientesCompletadas( completadas = true  ){

        console.log();
        let contador = 0;
        this.listadoArr.forEach( ( tarea ) =>{
            
            const { desc, competadoEn } = tarea;
            const estado = ( competadoEn )
                    ?'Completada'.green
                    :'Pendiente'.red;
            if( completadas ){

                if( competadoEn ){
                    contador +=1;
                    console.log(`${contador.toString().green }. ${desc} :: ${competadoEn.green} `);
                }
                    
            }else{
                if( !competadoEn ){
                    contador +=1;
                    console.log(`${contador.toString().green }. ${desc} :: ${estado} `);
                }

            }
                    

        })

    }

    togggleCompletadas ( ids =[] ){

        ids.forEach( id =>{
            const tarea = this._listado[id];
            if( !tarea.competadoEn ){
                tarea.competadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea =>{
                if ( !ids.includes(tarea.id ) ){
                    this._listado[tarea.id].competadoEn = null;
                  
                }
        })

    }



}

export{Tareas};