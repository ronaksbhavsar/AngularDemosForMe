import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ServiceRequestWorkorder } from "../../models/ServiceRequestWorkOrderModel";
import { CommunityLotModel } from "../../models/CommunitylotModel";
import { CommunityModel } from "../../models/CommunityModel";
import { Subject } from "rxjs/Subject";
import { DesigncategoryModel } from "../../models/DesignCategoryModel";

@Injectable()
export class SubscriptionService {
    public CommunityLotId$: BehaviorSubject<number>;
    public communityLots: CommunityModel[] = [];
    public designGridChanges$: Subject<DesigncategoryModel>;
    public IsDesignFeatureEnabled$: BehaviorSubject<boolean>;
    constructor() {
        this.CommunityLotId$ = new BehaviorSubject<number>(null);
        this.IsDesignFeatureEnabled$ = new BehaviorSubject<boolean>(false);
        this.designGridChanges$ = new Subject<DesigncategoryModel>();
    }

    public setCommunityLotId(lotId: number) {
        if (lotId) {
            this.CommunityLotId$.next(lotId);
        }
    }
}