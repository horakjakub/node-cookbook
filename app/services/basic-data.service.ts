/**
 * Created by jhorak on 17.07.2017.
 */

import { dataSchemasFactoriesFactory } from "./schemas-factories.factory";
import { Model } from 'mongoose';

//@TODO: change response in all queries for responseInterpreterFunction

export interface IBasicDataServiceOptions {
    defaultSearchKey?: string;
}

export class BasicDataService {
    modelName: string;
    model: any;
    schemaFactory: any;
    defaultSearchKey?: string;

    constructor(modelName: string, model, dataServiceOptions?: IBasicDataServiceOptions){
        this.modelName =  modelName;
        this.model = model;
        this.schemaFactory = dataSchemasFactoriesFactory(this.modelName);
        if(dataServiceOptions !== undefined){
            for(let option in dataServiceOptions){
                this.checkOption(option, dataServiceOptions[option]);
            }
        }
    }

    checkOption(option, optionValue){
        switch(option){
            case "defaultSearchKey":
                    this.defaultSearchKey = optionValue;
                break;
            default:
                break;
        }
    }

    find(response, searchKey?: string, searchValue?: string | number){
        let searchCriteriaObject = {};

        if(searchKey !== undefined && searchValue !== undefined){
            searchCriteriaObject[searchKey] = searchValue;
        } else {
            /// "Please specify which data record should be searched"
        }

        this.model.findOne(searchCriteriaObject,
            (error, result)=>{
                debugger;
                if(error){
                    response.send(error.message);
                } else {
                    response.send(result);
                }
            }
        );
    }

    list(response) {
        this.model.find({}, function(error, result) {
            if (error) {
                console.error(error);
                return null;
            }
            if (response !== null) {
                response.setHeader('content-type', 'application/json');
                response.end(JSON.stringify(result));
            }
            return JSON.stringify(result);
        });
    };

    create(requestBody, response) {
        let schemaData = this.schemaFactory(requestBody);
        schemaData.save(function(error, result) {
            if (!error){
                schemaData.save();
                response.send(result);
            }
            else {
                response.send(error.message);
            }
        });
    };

    update(requestBody, response, searchKey?: string, searchValue?: string | number){
        let searchCriteriaObject = {};

        if(searchKey !== undefined && searchValue !== undefined){
            searchCriteriaObject[searchKey] = searchValue;
        } else if (this.defaultSearchKey){
            searchCriteriaObject[this.defaultSearchKey] = requestBody[this.defaultSearchKey];
        }

        this.model.findOneAndUpdate(searchCriteriaObject, requestBody, { upsert: true, setDefaultsOnInsert: true },
            (error, result)=>{
                if(error){
                    response.send(error.message);
                } else {
                    response.send(result);
                }
            }
        );
    }

    remove(response, searchKey?: string, searchValue?: string | number){
        let searchCriteriaObject = {};

        if(searchKey !== undefined && searchValue !== undefined){
            searchCriteriaObject[searchKey] = searchValue;
        } else {
            /// "Please specify which data record should be removed"
        }

        this.model.remove(searchCriteriaObject,
            (error, result)=>{
            debugger;
                if(error){
                    response.send(error.message);
                } else {
                    response.send(result);
                }
            }
        );
    }

}
