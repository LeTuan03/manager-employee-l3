import React from 'react';
import { RELATIONSHIP } from '../../constants/constants';

const RelationShip = (relationShip) => {
    
        switch (relationShip) {
            case RELATIONSHIP.CHILD:
                relationShip = "Con";
                break;
            case RELATIONSHIP.PARENTS:
                relationShip = "Bố/Mẹ";
                break;
            case RELATIONSHIP.SIBLINGS:
                relationShip = "Anh/Chị/Em";
                break;
            default:
                relationShip = "Anh/Chị/Em";
                break;
        }
        return <div className="break-all">{relationShip}</div>;
}


export default RelationShip;