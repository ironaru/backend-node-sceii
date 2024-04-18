import express, { Express, Request, Response } from "express";
import Startups from "../models/startups";

const getStartups = async (req: Request, res: Response) => {
    try {
        let startups: Startups[]= [];
        await Startups.findAll().then((t: Startups[]) => {
            startups = t;
        });
        res.status(200).json(startups);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
export {getStartups};