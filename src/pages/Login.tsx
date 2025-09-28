import React, { useState } from "react";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login({ onLogin }: { onLogin: (n: string) => void }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onLogin(trimmed);
    navigate("/", { replace: true });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 480, mx: "auto", mt: 10, borderRadius: 3 }}>
      <Typography variant='h5' gutterBottom>
        {t("login.title")}
      </Typography>
      <Box component='form' onSubmit={submit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          label={t("login.name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <Button type='submit' variant='contained' size='large'>
          {t("login.enter")}
        </Button>
      </Box>
    </Paper>
  );
}
