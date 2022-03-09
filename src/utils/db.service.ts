import { Pool, Client } from "pg";
import { ResponseDto } from "@dto/Response.dto";
export const pool: Pool = new Pool({
    connectionString: process.env.RDS_CONNECTION
});
export let getSingleResult = async (query: string): Promise<ResponseDto<any>> => {
    try {
        let result = await pool.query(query);
        return { status: true, message: "Success", data: result.rows[0] };
    } catch (error) {
        return { status: false, message: "Success", error: error.message };
    }
}
export let getAllResults = async (query: string): Promise<ResponseDto<any[]>> => {
    try {
        let result = await pool.query(query);
        return { status: true, message: "Success", data: result.rows };
    } catch (error) {
        return { status: false, message: "Success", error: error.message };
    }
}