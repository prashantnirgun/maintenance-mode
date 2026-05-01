<script setup lang="ts">
import { onMounted } from 'vue'
import { useConfig } from '../composables/useConfig'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PublicStatusPage from './PublicStatusPage.vue'
import { SaveIcon, RefreshCcw } from 'lucide-vue-next'

const { config, isLoaded, isSaving, loadConfig, saveConfig } = useConfig()
const brandColorPalette = ['#2563eb', '#7c3aed', '#06b6d4', '#0f172a', '#22c55e', '#f97316', '#e11d48', '#111827']

onMounted(() => {
  loadConfig()
})

const handleSave = async () => {
  await saveConfig()
  alert('Configuration saved successfully!')
}
</script>

<template>
  <div v-if="!isLoaded" class="min-h-screen flex items-center justify-center">
    <RefreshCcw class="w-6 h-6 animate-spin text-muted-foreground" />
  </div>
  
  <div v-else class="h-screen w-full flex overflow-hidden bg-muted/20">
    <!-- Sidebar / Editor Panel -->
    <div class="w-[400px] border-r bg-background flex flex-col h-full shrink-0 shadow-sm z-10">
      <div class="p-6 border-b flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight">Status Admin</h1>
          <p class="text-sm text-muted-foreground">Manage your status pages</p>
        </div>
      </div>
      
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <Tabs defaultValue="content" class="w-full">
          <TabsList class="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" class="space-y-4">
            <div class="space-y-2">
              <Label>Browser Page Title</Label>
              <Input v-model="config.pageTitle" placeholder="Shown in browser tab title" />
            </div>

            <Card class="border-dashed">
              <CardContent class="p-4 space-y-4">
                <div>
                  <h3 class="text-sm font-semibold tracking-tight">Company Branding</h3>
                  <p class="text-xs text-muted-foreground">Manage name, contact details, and brand typography in one place.</p>
                </div>

                <div class="space-y-2">
                  <Label>Company Name</Label>
                  <Input v-model="config.companyName" placeholder="Brand/company name" />
                </div>

                <div class="space-y-2">
                  <Label>Contact Email</Label>
                  <Input v-model="config.contactEmail" type="email" placeholder="contact@company.com" />
                </div>

                <div class="space-y-2">
                  <Label>Company Name Color</Label>
                  <div class="flex items-center gap-3">
                    <Input v-model="config.companyNameColor" type="color" class="w-16 h-10 p-1" />
                    <Input v-model="config.companyNameColor" placeholder="#2563eb" class="flex-1" />
                  </div>
                  <div class="flex flex-wrap gap-2 pt-1">
                    <button
                      v-for="color in brandColorPalette"
                      :key="color"
                      type="button"
                      class="w-6 h-6 rounded-full border shadow-sm"
                      :style="{ backgroundColor: color }"
                      :title="`Use ${color}`"
                      @click="config.companyNameColor = color"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <Label>Company Name Font Size</Label>
                  <Select v-model="config.companyNameFontSize">
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20px">Small (20px)</SelectItem>
                      <SelectItem value="24px">Medium (24px)</SelectItem>
                      <SelectItem value="28px">Large (28px)</SelectItem>
                      <SelectItem value="32px">XL (32px)</SelectItem>
                      <SelectItem value="36px">XXL (36px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div class="space-y-2">
                  <Label>Company Name Font Weight</Label>
                  <Select v-model="config.companyNameFontWeight">
                    <SelectTrigger>
                      <SelectValue placeholder="Select font weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="400">Regular (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semibold (600)</SelectItem>
                      <SelectItem value="700">Bold (700)</SelectItem>
                      <SelectItem value="800">Extra Bold (800)</SelectItem>
                      <SelectItem value="900">Black (900)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div class="space-y-2">
                  <Label>Company Name Letter Spacing</Label>
                  <Select v-model="config.companyNameLetterSpacing">
                    <SelectTrigger>
                      <SelectValue placeholder="Select letter spacing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0em">Normal (0em)</SelectItem>
                      <SelectItem value="0.01em">Tight (0.01em)</SelectItem>
                      <SelectItem value="0.02em">Balanced (0.02em)</SelectItem>
                      <SelectItem value="0.05em">Wide (0.05em)</SelectItem>
                      <SelectItem value="0.08em">Extra Wide (0.08em)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div class="space-y-2">
              <Label>Page Type</Label>
              <Select v-model="config.pageType">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under Construction">Under Construction</SelectItem>
                  <SelectItem value="Launching Soon">Launching Soon</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Timer">Timer (Event Break)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-2">
              <Label>Headline</Label>
              <Input v-model="config.title" placeholder="Main title" />
            </div>

            <div class="space-y-2">
              <Label>Subtext</Label>
              <Input v-model="config.subtitle" placeholder="Description" />
            </div>

            <div class="space-y-2">
              <Label>CTA Text</Label>
              <Input v-model="config.ctaText" placeholder="Button text" />
            </div>

            <div v-if="config.pageType === 'Launching Soon' || config.pageType === 'Timer'" class="space-y-2">
              <Label>{{ config.pageType === 'Timer' ? 'Resume At' : 'Countdown Date' }}</Label>
              <Input type="datetime-local" v-model="config.countdownDate" />
            </div>

            <div v-if="config.pageType === 'Maintenance'" class="space-y-2">
              <Label>Maintenance Message</Label>
              <Input v-model="config.maintenanceMessage" placeholder="Message" />
            </div>
          </TabsContent>

          <TabsContent value="design" class="space-y-4">
            <div class="space-y-2">
              <Label>Design Template</Label>
              <Select v-model="config.template">
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MinimalCorporate">Minimal Corporate</SelectItem>
                  <SelectItem value="CreativeIllustration">Creative Illustration</SelectItem>
                  <SelectItem value="DarkTech">Dark Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-2">
              <Label>Animation Mode</Label>
              <Select v-model="config.animationMode">
                <SelectTrigger>
                  <SelectValue placeholder="Select animation mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="without-animation">Without animation</SelectItem>
                  <SelectItem value="with-animation">With animation (Three.js)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Card class="mt-4 border-dashed bg-muted/50">
              <CardContent class="p-4 text-center text-sm text-muted-foreground">
                Toggle templates to see real-time changes in the preview panel.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div class="p-4 border-t bg-background">
        <Button @click="handleSave" class="w-full" :disabled="isSaving">
          <RefreshCcw v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" />
          <SaveIcon v-else class="w-4 h-4 mr-2" />
          {{ isSaving ? 'Saving...' : 'Save & Publish' }}
        </Button>
      </div>
    </div>

    <!-- Live Preview Panel -->
    <div class="flex-1 h-full bg-slate-100 dark:bg-slate-900 flex flex-col">
      <div class="h-12 border-b bg-background flex items-center px-4 justify-between shrink-0 shadow-sm z-10">
        <div class="text-sm font-medium flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-500"></div>
          Live Preview
        </div>
        <div class="text-xs text-muted-foreground">config.json changes unsaved until publish</div>
      </div>
      <div class="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center">
        <!-- Scale down preview slightly for a "window" effect -->
        <div class="w-full max-w-5xl h-full max-h-[800px] border shadow-2xl rounded-lg overflow-hidden bg-background ring-1 ring-border/50">
           <!-- Render the public page but pass a prop to indicate preview mode if needed, or just let it use the reactive config -->
           <PublicStatusPage :preview-mode="true" />
        </div>
      </div>
    </div>
  </div>
</template>
