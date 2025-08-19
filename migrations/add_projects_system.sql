-- Migration: Add Projects System
-- This migration adds the Project table and updates ChatThread to include projectId

-- Create Project table
CREATE TABLE IF NOT EXISTS "project" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "user"("id"),
  "instructions" json NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Add projectId column to chat_thread table
ALTER TABLE "chat_thread" 
ADD COLUMN IF NOT EXISTS "project_id" uuid REFERENCES "project"("id");

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "project_user_id_idx" ON "project"("user_id");
CREATE INDEX IF NOT EXISTS "chat_thread_project_id_idx" ON "chat_thread"("project_id");
CREATE INDEX IF NOT EXISTS "project_updated_at_idx" ON "project"("updated_at");
