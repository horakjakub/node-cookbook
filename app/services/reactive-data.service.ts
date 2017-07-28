/**
 * Created by jhorak on 21.07.2017.
 */

import { BasicDataService, IBasicDataServiceOptions } from './basic-data.service'
import * as Rx from 'rxjs';

export class ReactiveDataService extends BasicDataService{
    constructor(modelName: string, model, options?: IBasicDataServiceOptions){
        super(modelName, model, options);
    }

    saveOne(requestBody, successCallback, errorCallback, completeCallback){
        let schemaData = this.schemaFactory(requestBody);
        let schemaDataObservable = Rx.Observable.fromPromise(schemaData.save());
        schemaDataObservable.subscribe(successCallback, errorCallback, completeCallback);
    }

    findMany(searchKey: string, searchValues: string[], successCallback, errorCallback, completeCallback){
        let dataStream = Rx.Observable.from(searchValues);
        let resultsStream = dataStream.flatMap((searchValue)=> Rx.Observable.fromPromise(this.model.findOne({[searchKey]:searchValue})));
        resultsStream.subscribe(successCallback, errorCallback, completeCallback);
    }

    saveMany(requestBody, successCallback, errorCallback, completeCallback){
        // @TODO - rethink about stream
        let dataStream = Rx.Observable.from(requestBody);
        let schemaDataStream = dataStream.map((data)=> this.schemaFactory(data));
        let resultsStream = schemaDataStream.flatMap((schemaData)=> Rx.Observable.fromPromise(schemaData.save()));
        resultsStream.subscribe(successCallback, errorCallback, completeCallback);
    }

    updateMany(searchKey: string, requestBody, successCallback, errorCallback, completeCallback){
        // @TODO - rethink about stream
        let dataStream = Rx.Observable.from(requestBody);
        let resultsStream = dataStream.flatMap((searchValue)=> Rx.Observable.fromPromise(this.model.findOneAndUpdate({[searchKey]:searchValue[searchKey]}, searchValue, { upsert: true, setDefaultsOnInsert: true })));
        resultsStream.subscribe(successCallback, errorCallback, completeCallback);
    }

    findManyAndSaveThoseWhichAreNotInDB(searchKey: string, requestBody, successCallback, errorCallback, completeCallback){
        let recordsToCheck = requestBody;
        let searchValues = [];
        recordsToCheck.forEach((record)=>{ searchValues.push(record[searchKey])});

        function removeFound(foundModel){
            if(foundModel !== null){
                recordsToCheck = recordsToCheck.filter((record)=>{ if(record[searchKey] !== foundModel[searchKey]){ return record }});
            }
        }

        this.findMany(searchKey, searchValues, removeFound, errorCallback, ()=>{
            this.saveMany(recordsToCheck, successCallback, errorCallback, completeCallback);
        });
    }
}