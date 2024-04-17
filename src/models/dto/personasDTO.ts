import Identificadores from "../identificadores";
import Personas from "../personas";

export class PersonasDTO {
    nombres: string = "";
    apellidos: string = "";
    residencia: string = "";
    correo: string = "";
    organizacion: string = "";
    ci: string = "";
    plan: string = "";
    celular: string = "";
    codigo_qr: string = "";
    constructor(){
    }




}
export function getDatosIdentificador(i:PersonasDTO): Identificadores {
    let identificador: Identificadores = new Identificadores();
    identificador.codigo_qr = i.codigo_qr;
    return identificador.dataValues as Identificadores;
}

export function getDatosPersona(p:PersonasDTO): Personas {
    let person: Personas = new Personas();
    person.nombres = p.nombres;
    person.apellidos = p.apellidos;
    person.organizacion = p.organizacion;
    person.plan = p.plan;
    person.ci = p.ci;
    person.residencia = p.residencia;
    person.celular = p.celular;
    person.correo = p.correo;

    return person.dataValues as Personas;
}