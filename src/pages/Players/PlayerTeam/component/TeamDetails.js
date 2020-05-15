import React from "react";
import {
  Grid,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  Card,
} from "@material-ui/core";

export function TeamDetails({ team, handleChange, className, subtitle }) {
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Card className={className}>
          <form
            autoComplete="off"
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            <CardHeader subheader={subtitle} title="Nome e Descrição" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Nome do time"
                    margin="dense"
                    name="team"
                    onChange={handleChange}
                    required
                    value={team.team}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Descrição"
                    helperText="Uma boa descrição impõe respeito aos adversários =D"
                    margin="dense"
                    name="bio"
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    value={team.bio}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
