import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable} from "node_modules/rxjs/dist/types";
import { timeout } from "node_modules/rxjs/operators";

export class TimeOutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(timeout(120000));
    }

}