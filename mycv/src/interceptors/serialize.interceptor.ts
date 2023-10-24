import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext, 
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {

    console.log({ context, message: 'this runs before the route handler' });

    return next.handle().pipe(
      map((data: any) => {
        // run something before response is sent
        console.log({ data, message: 'this runs after the route handler' });

        return plainToInstance(this.dto, data, {
          // expose properties annotated with @Expose in dto
          excludeExtraneousValues: true
        })
      })
    );

  }  
}