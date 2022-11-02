import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import  {Box} from './box';
import {MessageService} from './message.service';
import axios from 'axios';


export const customAxios = axios.create({
  baseURL: 'http://localhost:5000/',

})
@Injectable({  providedIn: 'root'})
export class BoxService {
  private boxesUrl = 'http://localhost:5000/Box/';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':
          'application/json'})
  };


  constructor(
      private http: HttpClient,
      private messageService: MessageService) {  }

 


 async getBoxes(): Promise<any> {
  /*  return this.http.get<Box[]>(this.boxesUrl+"GetBox")
        .pipe(
            tap(_ => this.log('fetched boxes')),
            catchError(this.handleError<Box[]>('getBoxes', []))
        );*/
   const httpResult =await customAxios.get<Box[]>('Box/GetBox');
    return httpResult.data;
  }
  

  getBoxNo404<Data>(id: number): Observable<Box>{
    const url = '${this.boxesUrl}/?id=${id}';
    return this.http.get<Box[]>(url)
        .pipe(
            map(boxes => boxes[0]), // returns a {0|1} element array
            tap(h => {
              const outcome = h ? 'fetched' : 'did not find';
              this.log(`${outcome} box id=${id}`);
            }),
            catchError(this.handleError<Box>(`getBox id=${id}`))
        );
  }

  /** GET box by id. Will 404 if id not found */
  getBox(id: number): Observable<Box> {
    const url = '${this.boxesUrl}/${id}';
    return this.http.get<Box>(url).pipe(
        tap(_ => this.log(`fetched box id=${id}`)),
        catchError(this.handleError<Box>(`getBox id=${id}`))
    );
   }

  /* GET boxes whose name contains search term */
  searchBoxes(term: string):  Observable<Box[]>{
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<Box[]>('${this.boxesUrl}/? name=${term}')
        .pipe(
            tap(x => x.length?
                this.log('found boxes macting "${term}"'):
                this.log(`no boxes matching "${term}"`)),
            catchError(this.handleError<Box []>('searchBoxes', [])
            )
        );
  }


  
  /** POSt: add a new box to th server*/ 
  addBox(box: Box): Observable<Box>{
    return this.http.post<Box>(this.boxesUrl, box, this.httpOptions).pipe(
        tap((newBox: Box) => this.log('added box w/ id=${newBox.id}')),
        catchError(this.handleError<Box>('addBox'))
    );    
  }
  
  /** DELETE: delete the box from the server */
  deleteBox (id: number): Observable<Box>{
    const url = '${this.boxesUrl}/${id}';

    return this.http.delete<Box>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted box id=${id}`)),
        catchError(this.handleError<Box>('deleteBox'))
    );
  }

  /** PUT: update the box on the server */
  updateBox(box : Box): Observable<any>{
    return this.http.put(this.boxesUrl, box, this.httpOptions).pipe(
        tap(_ => this.log(`updated box id=${box.id}`)),
        catchError(this.handleError<any>('updateBox'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`BoxService: ${message}`);
  }
}


    
 
    


 
  
 
