"use client"

import { ClockIcon } from "lucide-react";
import React, { ChangeEvent } from "react";

interface TimePickerProps {
    time?: string,
    setTime: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export function TimePicker(props : TimePickerProps){

    const { time, setTime } = {...props};

    const [hover, setHover] = React.useState<boolean>(false);
    
    function mouseOver(event: any) {
        setHover(true);
    }
    function mouseOut(event: any){
        setHover(false);
    }

    function onChange(event: ChangeEvent<HTMLInputElement>){
        setTime(event.target.value);
    }

    return (
        <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center px-2 m-3 pointer-events-none bg-background z-0"/>
            <div className={ `absolute inset-y-0 end-0 top-0 flex items-center m-3 pointer-events-none ${hover ? 'bg-primary/5' : 'bg-background'} z-10` }>
                <ClockIcon size={18} className={hover ? "text-primary" : "text-muted-foreground"}/>
            </div>
            <input value={time} onChange={onChange} onMouseOver={mouseOver} onMouseOut={mouseOut} type="time" id="time" className="focus:outline-none hover:bg-primary/5 bg-background border border-primary text-muted-foreground text-sm rounded-lg block w-full p-2.5 cursor-pointer" />
        </div>
    );
}