/**
 * Created by jhorak on 17.07.2017.
 */

import { dataSchemasFactoriesFactory } from "./schemas-factories.factory";
import { Model, Schema } from 'mongoose';


export interface IBasicDataServiceOptions {
}

export interface ISearchCriteriaObject {
    [key: string]: string
}

export class BasicDataService {
    modelName: string;
    model: any;
    schemaFactory: any;

    constructor(modelName: string, model, options?: IBasicDataServiceOptions){
        this.modelName =  modelName;
        this.model = model;
        this.schemaFactory = dataSchemasFactoriesFactory(this.modelName);

        if(options !== undefined){
            for(let option in options){
                this.checkOption(option, options[option]);
            }
        }
    }

    checkOption(option, optionValue){
        switch(option){
            default:
                break;
        }
    }

    find(searchCriteriaObject: ISearchCriteriaObject, resultHandler):void {
        this.model.findOne(searchCriteriaObject,
            resultHandler
        );
    }

    list(resultHandler):void {
        this.model.find({}, resultHandler);
    };

    create(requestBody, resultHandler):void {
        let schemaData = this.schemaFactory(requestBody);
        schemaData.save(resultHandler);
    };

    update(searchCriteriaObject: ISearchCriteriaObject, requestBody, resultHandler):void {
        this.model.findOneAndUpdate(searchCriteriaObject, requestBody, { upsert: true, setDefaultsOnInsert: true },
            resultHandler
        );
    }

    remove(searchCriteriaObject: ISearchCriteriaObject, resultHandler):void {
        this.model.remove(searchCriteriaObject, resultHandler);
    }

    findAndRemove(searchCriteriaObject: ISearchCriteriaObject, resultHandler):void {
        this.model.findOneAndRemove(searchCriteriaObject, resultHandler);
    }

    findById(id, resultHandler):void {
        this.model.findById(id, resultHandler);
    }
}
