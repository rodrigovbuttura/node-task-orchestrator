import Orchestrator from "./Functions/Orchestrator.js";

let countSecond = 0
const Second = () => console.log("Second -->", countSecond++ );

Orchestrator({
    display:"Orchestrator by second",
    locale:"pt-br",
    diff:"second",
    interval:8,
}, Second );


let countMinute = 0
const Minute = (callback) => console.log("Minute --> ",countMinute++,"\n Callback--> ", callback);

Orchestrator({
    display:"Orchestrator by minute",
    locale:"pt-br",
    diff:"minute",
    interval:1,
}, Minute );

/* 
    display  => nome da tarefa
    locale   => dado baseado no idioma
    diff     => orientação para execução da tarefa: "day", "hour, "minute", "second"
    interval => intervalo de tempo entre uma execução a outra

    Orchestrator({ props }, funçãoDaTarefa(callback));
    
*/