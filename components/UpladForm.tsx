"use client"

import React, { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, Image as ImageIcon, X } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { LoadingOverlay } from "./LoadingOverlay"
import { cn } from "@/lib/utils"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

const formSchema = z.object({
  pdfFile: z.any()
    .refine((file) => file, "PDF file is required")
    .refine((file) => !file || file?.size <= MAX_FILE_SIZE, `Max file size is 50MB.`),
  coverImage: z.any().optional(),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author Name is required"),
  voice: z.string().min(1, "Please select an assistant voice")
})

const MALE_VOICES = [
  { id: "dave", name: "Dave", description: "Young male, British-Essex, casual & conversational" },
  { id: "daniel", name: "Daniel", description: "Middle-aged male, British, authoritative but warm" },
  { id: "chris", name: "Chris", description: "Male, casual & easy-going" }
]

const FEMALE_VOICES = [
  { id: "rachel", name: "Rachel", description: "Young female, American, calm & clear" },
  { id: "sarah", name: "Sarah", description: "Young female, American, soft & approachable" }
]

export default function UpladForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
    }, 3000)
  }

  return (
    <div className="new-book-wrapper max-w-3xl mx-auto w-full">
      {isSubmitting && <LoadingOverlay />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* PDF File Upload */}
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label text-base font-semibold text-gray-800">Book PDF File</FormLabel>
                <FormControl>
                  <div 
                    className={cn(
                      "upload-dropzone border-[1.5px] border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-50/50 bg-white",
                      field.value ? "border-solid border-gray-300" : "border-gray-200"
                    )}
                    onClick={() => {
                      if (!field.value) {
                         fileInputRef.current?.click()
                      }
                    }}
                  >
                    <input 
                      type="file" 
                      accept="application/pdf"
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(file)
                        }
                      }}
                    />
                    
                    {field.value instanceof File ? (
                      <div className="flex items-center space-x-3 bg-[#FAF8F5] px-4 py-3 rounded-lg border border-[#EBE5DF]">
                        <span className="text-sm font-medium text-gray-700 truncate max-w-xs">{field.value.name}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            field.onChange(undefined)
                            if (fileInputRef.current) {
                              fileInputRef.current.value = ''
                            }
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <Upload className="h-8 w-8 text-[#8B7C73] mb-3 stroke-[1.5]" />
                        <span className="text-[#6D625A] font-medium text-base mb-1">Click to upload PDF</span>
                        <span className="text-[#A39B95] text-sm">PDF file (max 50MB)</span>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image Upload (Optional) */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label text-base font-semibold text-gray-800">Cover Image (Optional)</FormLabel>
                <FormControl>
                  <div 
                    className={cn(
                      "upload-dropzone border-[1.5px] border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-50/50 bg-white",
                      field.value ? "border-solid border-gray-300" : "border-gray-200"
                    )}
                    onClick={() => {
                       if (!field.value) {
                         imageInputRef.current?.click()
                       }
                    }}
                  >
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      ref={imageInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(file)
                        }
                      }}
                    />
                    
                    {field.value instanceof File ? (
                      <div className="flex items-center space-x-3 bg-[#FAF8F5] px-4 py-3 rounded-lg border border-[#EBE5DF]">
                        <span className="text-sm font-medium text-gray-700 truncate max-w-xs">{field.value.name}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            field.onChange(undefined)
                            if (imageInputRef.current) {
                                imageInputRef.current.value = ''
                            }
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <ImageIcon className="h-8 w-8 text-[#8B7C73] mb-3 stroke-[1.5]" />
                        <span className="text-[#6D625A] font-medium text-base mb-1">Click to upload cover image</span>
                        <span className="text-[#A39B95] text-sm">Leave empty to auto-generate from PDF</span>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label text-base font-semibold text-gray-800">Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ex: Rich Dad Poor Dad" 
                    className="form-input h-[52px] bg-white border border-gray-200 placeholder:text-gray-400 text-base rounded-xl focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#8B7C73] shadow-sm"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Name */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label text-base font-semibold text-gray-800">Author Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ex: Robert Kiyosaki" 
                    className="form-input h-[52px] bg-white border border-gray-200 placeholder:text-gray-400 text-base rounded-xl focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#8B7C73] shadow-sm"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assistant Voice */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel className="form-label text-base font-semibold text-gray-800">Choose Assistant Voice</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <p className="text-sm text-gray-500 mb-3 ml-1 font-medium">Male Voices</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {MALE_VOICES.map((voice) => (
                          <FormItem key={voice.id} className="flex items-center space-y-0 relative">
                            <FormControl>
                              <RadioGroupItem value={voice.id} className="sr-only" id={voice.id} />
                            </FormControl>
                            <FormLabel 
                              htmlFor={voice.id} 
                              className={cn(
                                "voice-selector-option flex flex-col p-4 bg-white border border-gray-200 rounded-xl cursor-pointer w-full transition-all duration-200 ease-in-out hover:shadow-sm",
                                field.value === voice.id && "voice-selector-option-selected ring-1 ring-[#8B7C73] border-[#8B7C73] bg-[#FAF8F5]"
                              )}
                            >
                              <div className="flex items-center mb-1.5">
                                <div className={cn(
                                  "h-4 w-4 rounded-full border border-gray-300 mr-2.5 flex items-center justify-center transition-colors",
                                  field.value === voice.id && "border-0 bg-[#663820]"
                                )}>
                                  {field.value === voice.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                </div>
                                <span className={cn(
                                  "font-semibold text-gray-800 text-sm",
                                  field.value === voice.id && "text-[#663820]"
                                )}>
                                  {voice.name}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed ml-6">
                                {voice.description}
                              </p>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-3 ml-1 font-medium">Female Voices</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {FEMALE_VOICES.map((voice) => (
                          <FormItem key={voice.id} className="flex items-center space-y-0 relative">
                            <FormControl>
                              <RadioGroupItem value={voice.id} className="sr-only" id={voice.id} />
                            </FormControl>
                            <FormLabel 
                              htmlFor={voice.id} 
                              className={cn(
                                "voice-selector-option flex flex-col p-4 bg-white border border-gray-200 rounded-xl cursor-pointer w-full transition-all duration-200 ease-in-out hover:shadow-sm",
                                field.value === voice.id && "voice-selector-option-selected ring-1 ring-[#8B7C73] border-[#8B7C73] bg-[#FAF8F5]"
                              )}
                            >
                              <div className="flex items-center mb-1.5">
                                <div className={cn(
                                  "h-4 w-4 rounded-full border border-gray-300 mr-2.5 flex items-center justify-center transition-colors",
                                  field.value === voice.id && "border-0 bg-[#663820]"
                                )}>
                                  {field.value === voice.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                </div>
                                <span className={cn(
                                  "font-semibold text-gray-800 text-sm",
                                  field.value === voice.id && "text-[#663820]"
                                )}>
                                  {voice.name}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed ml-6">
                                {voice.description}
                              </p>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button 
              type="submit" 
              className="form-btn w-full h-14 text-lg bg-[#663820] hover:bg-[#522c19] text-white font-serif rounded-xl transition-all shadow hover:shadow-md"
            >
              Begin Synthesis
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}