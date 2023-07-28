import React, { ReactNode } from "react";


const TestComponent: React.FC<{ children: ReactNode }> = (props: any) => {
    return <div>
        {props.children}
    </div>
};

export default TestComponent;