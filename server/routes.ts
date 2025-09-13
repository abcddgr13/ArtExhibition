import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArtworkSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all artworks
  app.get("/api/artworks", async (req, res) => {
    try {
      const artworks = await storage.getArtworks();
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artworks" });
    }
  });

  // Get artwork by ID
  app.get("/api/artworks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const artwork = await storage.getArtworkById(id);
      
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }
      
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artwork" });
    }
  });

  // Create new artwork
  app.post("/api/artworks", async (req, res) => {
    try {
      const validation = insertArtworkSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid artwork data",
          errors: validation.error.errors 
        });
      }
      
      const artwork = await storage.createArtwork(validation.data);
      res.status(201).json(artwork);
    } catch (error) {
      res.status(500).json({ message: "Failed to create artwork" });
    }
  });

  // Update artwork
  app.patch("/api/artworks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validation = insertArtworkSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid artwork data",
          errors: validation.error.errors 
        });
      }
      
      const artwork = await storage.updateArtwork(id, validation.data);
      
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }
      
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ message: "Failed to update artwork" });
    }
  });

  // Delete artwork
  app.delete("/api/artworks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteArtwork(id);
      
      if (!success) {
        return res.status(404).json({ message: "Artwork not found" });
      }
      
      res.json({ message: "Artwork deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete artwork" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
