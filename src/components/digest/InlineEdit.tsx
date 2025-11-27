"use client";

import React, { useEffect, useRef, useState } from "react";

interface InlineEditProps {
  value: string;
  onChange: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  autoFocus?: boolean;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onChange,
  onCancel,
  placeholder = "Type something...",
  className = "",
  multiline = false,
  autoFocus = true,
}) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && autoFocus && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing, autoFocus]);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onChange(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (!multiline || e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <div
        className={`cursor-text hover:bg-gray-50 rounded px-1 -mx-1 transition-colors ${className}`}
        onClick={() => {
          setIsEditing(true);
        }}
      >
        {value || <span className="text-gray-400">{placeholder}</span>}
      </div>
    );
  }

  const commonProps = {
    ref: inputRef as React.RefObject<HTMLInputElement & HTMLTextAreaElement>,
    value: editValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditValue(e.target.value);
    },
    onBlur: handleSave,
    onKeyDown: handleKeyDown,
    placeholder,
    className: `w-full bg-transparent border-none outline-none focus:ring-0 px-1 -mx-1 ${className}`,
  };

  if (multiline) {
    return <textarea {...commonProps} rows={3} />;
  }

  return <input {...commonProps} type="text" />;
};
