/*מגדיר איך נראה כל "רשומת מטוס" במסד הנתונים, כדי שהשרת ידע לאכוף את המבנה*/
import mongoose, { mongo } from "mongoose";

export interface IPlane {
    altitude: number;
    his: number;
    adi: number;
}

const planeSchema = new mongoose.Schema<IPlane>({
    altitude: { type: Number, required: true },
    his: { type: Number, required: true },
    adi: { type: Number, required: true },
});

export const Plane = mongoose.model<IPlane>('Plane', planeSchema);