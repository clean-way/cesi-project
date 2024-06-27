import { CustomProgressProps, Progress } from "../../ui/progress";

interface CustomProgressWithValueProps extends CustomProgressProps{
    value: number,
    height?: number | string,
    width?: number | string,
}

export default function ProgressBar(props : CustomProgressWithValueProps){
    const { value, indicatorColor = 'bg-primary', backgroundColor = 'bg-background', height = 20, width = '100%' } = {...props};
    return (
        <div style={{
            height: height,
            width: width,
        }}>
            <Progress value={value} indicatorColor={indicatorColor} backgroundColor={backgroundColor} />
        </div>
    );
}