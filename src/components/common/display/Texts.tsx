export function H1(props: BaseTextProps) {
    const { text, italic, underline, fontWeight } = { ...props };
    let weight: string = 'font-normal';
    switch (fontWeight) {
        case 'regular':
            weight = 'font-normal';
        case 'medium':
            weight = 'font-medium';
        case 'semibold':
            weight = 'font-semibold';
        case 'bold':
            weight = 'font-bold';
    }
    return (
        <div className={`text-h1 ${italic ? 'italic' : ''} ${underline ? 'underline' : ''} ${weight}`}>
            {text}
        </div>
    );
};

export function H2(props: BaseTextProps) {
    const { text, italic, underline, fontWeight } = { ...props };
    let weight: string = 'font-normal';
    switch (fontWeight) {
        case 'regular':
            weight = 'font-normal';
        case 'medium':
            weight = 'font-medium';
        case 'semibold':
            weight = 'font-semibold';
        case 'bold':
            weight = 'font-bold';
    }
    return (
        <div className={`text-h2 ${italic ? 'italic' : ''} ${underline ? 'underline' : ''} ${weight}`}>
            {text}
        </div>
    );
};

export function H3(props: BaseTextProps) {
    const { text, italic, underline, fontWeight } = { ...props };
    let weight: string = 'font-normal';
    switch (fontWeight) {
        case 'regular':
            weight = 'font-normal';
        case 'medium':
            weight = 'font-medium';
        case 'semibold':
            weight = 'font-semibold';
        case 'bold':
            weight = 'font-bold';
    }
    return (
        <div className={`text-h3 ${italic ? 'italic' : ''} ${underline ? 'underline' : ''} ${weight}`}>
            {text}
        </div>
    );
};

export function H4(props: BaseTextProps) {
    const { text, italic, underline, fontWeight } = { ...props };
    let weight: string = 'font-normal';
    switch (fontWeight) {
        case 'regular':
            weight = 'font-normal';
        case 'medium':
            weight = 'font-medium';
        case 'semibold':
            weight = 'font-semibold';
        case 'bold':
            weight = 'font-bold';
    }
    return (
        <div className={`text-h4 ${italic ? 'italic' : ''} ${underline ? 'underline' : ''} ${weight}`}>
            {text}
        </div>
    );
};

export function H5(props: BaseTextProps) {
    const { text, italic, underline, fontWeight } = { ...props };
    let weight: string = 'font-normal';
    switch (fontWeight) {
        case 'regular':
            weight = 'font-normal';
        case 'medium':
            weight = 'font-medium';
        case 'semibold':
            weight = 'font-semibold';
        case 'bold':
            weight = 'font-bold';
    }
    return (
        <div className={`text-h5 ${italic ? 'italic' : ''} ${underline ? 'underline' : ''} ${weight}`}>
            {text}
        </div>
    );
};

export function H6(props: BaseTextProps) {
    const { text, italic, underline, fontWeight } = { ...props };
    let weight: string = 'font-normal';
    switch (fontWeight) {
        case 'regular':
            weight = 'font-normal';
        case 'medium':
            weight = 'font-medium';
        case 'semibold':
            weight = 'font-semibold';
        case 'bold':
            weight = 'font-bold';
    }
    return (
        <div className={`text-h6 ${italic ? 'italic' : ''} ${underline ? 'underline' : ''} ${weight}`}>
            {text}
        </div>
    );
}

export function P(props: BaseTextProps) {
    const { text, italic, underline, fontWeight } = { ...props };
    let weight: string = 'font-normal';
    switch (fontWeight) {
        case 'regular':
            weight = 'font-normal';
        case 'medium':
            weight = 'font-medium';
        case 'semibold':
            weight = 'font-semibold';
        case 'bold':
            weight = 'font-bold';
    }
    return (
        <div className={`text-p ${italic ? 'italic' : ''} ${underline ? 'underline' : ''} ${weight}`}>
            {text}
        </div>
    );
}

export function SmallText(props: BaseTextProps) {
    const { text, italic = true, underline, fontWeight } = { ...props };
    let weight: string = 'font-normal';
    switch (fontWeight) {
        case 'regular':
            weight = 'font-normal';
        case 'medium':
            weight = 'font-medium';
        case 'semibold':
            weight = 'font-semibold';
        case 'bold':
            weight = 'font-bold';
    }
    return (
        <div className={`text-xs xl:text-sm ${italic ? 'italic' : ''} ${underline ? 'underline' : ''} ${weight}`}>
            {text}
        </div>
    );
}

export interface BaseTextProps {
    text: string,
    italic?: boolean,
    underline?: boolean,
    fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold',
};

export interface TextProps extends BaseTextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small',
};

export function Text(props: TextProps) {
    const { variant } = { ...props };
    switch (variant) {
        case 'h1':
            return <H1 {...props} />
        case 'h2':
            return <H2 {...props} />
        case 'h3':
            return <H3 {...props} />
        case 'h4':
            return <H4 {...props} />
        case 'h5':
            return <H5 {...props} />
        case 'h6':
            return <H6 {...props} />
        case 'p':
            return <P {...props} />        
        case 'small':
            return <SmallText {...props} />
        default:
            return <P {...props} />
    }
};