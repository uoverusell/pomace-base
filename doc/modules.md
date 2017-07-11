# pomace base modules

## serialize

depend: base/lv1/log  

serialize.__sequence__( collect )

参数说明

## log

描述：日志相关

log.__debug__( describe )

参数说明

    string describe log content

log.__errBreak__( describe )

参数说明

    string describe error content

log.__captureException__()    

参数说明

    nothing

log.__openLog__( type )

参数说明

    string type open listen log type

## clock

描述：时间相关

clock.__dateFormat__( format, \[date\] )  

参数说明

    string format
    default {yyyy}/{mm}/{dd} {hh}:{ii}:{ss}

    void date
    default now timestamp

## dom

描述：DOM相关

dom.__buildDOM__( describe )  

参数说明

    string describe html code

dom.__gatherDOM__( collect )  

参数说明

    array collect a group dom/chorusDOM

dom.__searchDOM__( describe )

参数说明

    string describe css code  
