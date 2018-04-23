
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Utilities } from './Utilities';
@Injectable()
export class CustomNotification {

    constructor(private toastService: ToastrService) { }

    notify(message: string, title: string, type: string) {        
        switch (type) {
            case Utilities.success:
                this.toastService.success(message, title);
                break;
            case Utilities.error:
                this.toastService.error(message, title);
                break;
            case Utilities.warning:
                this.toastService.warning(message, title);
                break;
            case Utilities.info:
                this.toastService.info(message, title);
                break;
            default:
                break;
        }
    }

}
