export class MaintenanceModel {
    public MaintenanceTaskName: string;
    public IsCompleted: boolean;
    public MaintenanceScheduleTaskID: number;
}

export class InsertMaintenanceViewModel {
    public CommunityLotID: number;
    public MaintenanceScheduleTaskID: number;
}