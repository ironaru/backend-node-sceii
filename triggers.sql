--ANTES DE INSERTAR LAS PERSONAS
create or replace function verificarIdentificadorDisponible() returns trigger as
$$
declare
    person_id integer;
begin
    select a.persona_id into person_id
    from identificadores a
    where a.persona_id = null
    order by id asc
    limit 1;
    if person_id is not null then
        raise exception 'Identificadores no disponibles';
        return null;
    end if;
    return new;
end;
$$
language plpgsql;

create trigger verificarIdentificadorDisponible before insert on personas for each row execute procedure verificarIdentificadorDisponible();

--DESPUES DE INSERTAR LAS PERSONAS
create or replace function addPersonaQr() returns trigger as
$$
declare
    id_i integer;
begin
    select a.id into id_i
    from identificadores a
    where a.persona_id is null
    order by a.id asc
    limit 1;
   
    if id_i is null then
        raise exception 'Identificadores no disponibles';
        return null;
    end if;
    
    UPDATE identificadores SET persona_id = new.id where id = id_i;
    return new;
end;
$$
language plpgsql;

create trigger addPersonaQr after insert on personas for each row execute procedure addPersonaQr();
