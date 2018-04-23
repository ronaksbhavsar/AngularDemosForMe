import { confirm } from 'devextreme/ui/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
export class Utilities {
    constructor() { }
    static success: string = "success";
    static warning: string = "warning";
    static info: string = "info";
    static error: string = "error";
    static colorText: string = "[Select]";
    static generateGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    static confirm(message: string, title: string) {
        return confirm(message, title);
    }

    static ConvertTimeToDate(time: string) {
        return moment(time, "HH:mm").toDate();
    }

    static ConvertDateToTime(date: string | Date) {
        return moment(date).format("HH:mm");
    }

    static checkComparisionForTime(param: any) {
        return param !== "00:00:00" && param !== "00:00" && param != undefined;
    }

    static convertToStandardDateFormat(value: string | Date) {
        return (value == null) || (value === "-") ? '-' : moment(value, environment.momentBackendFormat).format(environment.displayFormat);
    }

    static getCurrentYear() {
        return moment(new Date()).format('YYYY');
    }

    static momentDateConversion(fromDate: Date | string, toDate: Date | string) {
        return moment(fromDate, "HH:mm").isBefore(moment(toDate, "HH:mm"));
    }

    static setTitleDxPopup(event: any) {
        if (event.element && event.element.getElementsByClassName('dx-closebutton')) {
            event.element.getElementsByClassName('dx-closebutton')[0].setAttribute("title", "Close");
        }
    }

    static renderGoogleTranslateScript() {
        let el = document.createElement('script');
        el.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(el);        
    }

}

