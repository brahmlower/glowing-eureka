
enum Activity {
    Mining = 1,
}

interface ChangeActivity {
    activity: Activity | null,
}

interface CurrentActivity {
    activity: Activity | null,
}

interface ActivityStore {
    activity: Activity | null,
}

const defaultActivity: ActivityStore = {
    activity: null,
}

function rpcCurrentActivity(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string | void {
    const read_req: nkruntime.StorageReadRequest = {
        collection: "Activity",
        key: "Player",
        userId: ctx.userId,
    };
    const activity_store = nk.storageRead([read_req])
    const activity: ActivityStore = activity_store.length === 0
        ? defaultActivity
        : (activity_store[0].value as unknown as ActivityStore);

    const response: CurrentActivity = activity
    return JSON.stringify(response);
}

function rpcChangeActivity(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string | void {
    const activity_req: ChangeActivity = JSON.parse(payload)

    const read_req: nkruntime.StorageReadRequest = {
        collection: "Activity",
        key: "Player",
        userId: ctx.userId,
    };
    const activity_store = nk.storageRead([read_req])
    const activity: ActivityStore = activity_store.length === 0
        ? defaultActivity
        : (activity_store[0].value as unknown as ActivityStore);

    logger.debug(`Updating activity for user ${ctx.userId} from ${activity.activity} to ${activity_req.activity}`);
    const updated_activity: ActivityStore = {
        activity: activity_req.activity,
    }
    // activity.activity = activity_req.activity;

    const storage_writes: nkruntime.StorageWriteRequest[] = [];
    storage_writes.push({
        collection: "Activity",
        key: "Player",
        userId: ctx.userId,
        value: updated_activity,
        permissionRead: 1,
        permissionWrite: 0,
    });
    nk.storageWrite(storage_writes);

    const response: CurrentActivity = updated_activity
    return JSON.stringify(response);
}

function InitModule(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
    logger.info("Adding functions for the game! 🎉");

    initializer.registerRpc("ChangeActivity", rpcChangeActivity);
    initializer.registerRpc("CurrentActivity", rpcCurrentActivity);
}
if (InitModule !== undefined) {}
